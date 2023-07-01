import React, { useState, useEffect, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import { csrfToken } from '@rails/ujs';
import SVG from 'react-inlinesvg';
import { createRoot } from 'react-dom/client';
import {
  EditorBoldIcon,
  EditorChevronDownIcon,
  EditorImageIcon,
  EditorItalicIcon,
  EditorLinkIcon,
  EditorListIcon,
  EditorUnderlineIcon
} from '../helpers/iconsRaw';
import { fetchNoteContent } from '../helpers/apiCalls';
import useAuth from '../context/AuthContext';
import useResponsive from '../hooks/useResponsive';
import exportNoteToPDF from '../helpers/exportNoteToPDF';
import ExportPurpleIcon from '../../../../assets/images/reskin-images/icon--export-purple.svg';
import handleSidebarResize from '../helpers/handleSidebarResize';
import { useSideBarContent } from '../context/SidebarContext';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-Token': csrfToken()
};

const Editor = ({ behavior, className, fixedHeight, module }) => {
  const [currentNote, setCurrentNote] = useState();
  const [noteContent, setNoteContent] = useState();
  const [saving, setSaving] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const { isMobile } = useResponsive();
  const { setSidebarHeight } = useSideBarContent();

  const { userData } = useAuth();

  const { data, isLoading, error, refetch } = useQuery(
    ['noteContent', behavior?.id, userData?.id],
    () => fetchNoteContent({ behaviorId: behavior?.id }),
    {
      enabled: !!behavior?.id
    }
  );

  useEffect(() => {
    if (data) {
      setCurrentNote(data);
      setNoteContent(data?.content);
    } else {
      setCurrentNote(null);
      setNoteContent(null);
    }
  }, [data]);

  useEffect(() => {
    if (behavior?.id) {
      refetch();
    }
  }, [behavior?.id, refetch]);
  const saveNote = useCallback(async () => {
    const type = currentNote?.id === undefined ? 'new' : 'update';
    let path = '';
    let body = '';

    if (type === 'new') {
      path = '/api/v2/notes/create_note';
      body = JSON.stringify({
        content: noteContent,
        behavior_id: behavior?.id
      });
    }

    if (type === 'update') {
      path = '/api/v2/notes/update_note';
      body = JSON.stringify({ content: noteContent, id: currentNote?.id });
    }

    const res = await fetch(path, {
      method: 'POST',
      headers,
      body
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    // Update the currentNote state when a new note is created
    if (type === 'new') {
      setCurrentNote(result.note);
    }


    setSaving(false);
  }, [currentNote, behavior, noteContent]);

  const debouncedSaveNote = useCallback(debounce(saveNote, 1000), [saveNote]);

  const [noteModified, setNoteModified] = useState(false);

  const handleEditorChange = (value) => {
    handleSidebarResize(setSidebarHeight);
    setNoteContent(value);
    setNoteModified(true);
    setSaving(true);
    debouncedSaveNote();
  };

  useEffect(() => {
    if (noteContent !== undefined && noteModified) {
      debouncedSaveNote();
    }
    return () => debouncedSaveNote.cancel();
  }, [noteContent, noteModified, debouncedSaveNote]);

  const boxStyle = {
    width: '100%',
    height: '100%'
  };

  const [toolbar, setToolbar] = useState(null);

  useEffect(() => {
    const toolbarElement = document.querySelector('.ql-toolbar');
    if (toolbarElement) {
      setToolbar(toolbarElement);
    }
  }, []);

  useEffect(() => {
    if (!module) {
      return;
    }

    if (!toolbar) {
      return;
    }

    if (currentNote) {
      currentNote.behavior_title = behavior?.title;
      currentNote.module_title = module?.title;
    }

    toolbar.style.display = 'flex';
    toolbar.style.flexWrap = 'wrap';

    const span = document.createElement('span');
    span.className = 'ql-formats';
    span.style.display = 'inline-block';
    span.style.marginRight = '0';
    span.style.marginLeft = !isMobile && 'auto';
    span.style.marginTop = isMobile && '16px';

    const button = document.createElement('button');
    button.className = 'ql-formats right flex items-center';
    button.setAttribute('type', 'button');
    button.style.display = 'flex';
    button.style.width = 'auto';
    button.onclick = () => exportNoteToPDF(currentNote);

    const icon = document.createElement('div');
    const root = createRoot(icon);
    root.render(<SVG src={ExportPurpleIcon} />);
    button.appendChild(icon);

    const innerSpan = document.createElement('span');
    innerSpan.className = 'text-link-purple font-bold font-sans font-sm ml-2';
    innerSpan.innerHTML = 'Export';

    span.appendChild(button);
    button.appendChild(icon);
    button.appendChild(innerSpan);
    toolbar.appendChild(span);

    return () => {
      toolbar.removeChild(span);
    };
  }, [toolbar, currentNote]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'bullet' }],
      ['link', 'image']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
    'image'
  ];
  const icons = ReactQuill.Quill.import('ui/icons');

  icons.bold = EditorBoldIcon;
  icons.italic = EditorItalicIcon;
  icons.image = EditorImageIcon;
  icons.link = EditorLinkIcon;
  icons.underline = EditorUnderlineIcon;
  icons.list.bullet = EditorListIcon;
  icons.header[1] = EditorChevronDownIcon;
  icons.header[2] = '';

  const handleFocus = () => {
    setToolbarVisible(true);
  };

  const handleBlur = () => {
    setToolbarVisible(false);
  };

  const quillClassName = `custom-quill ${
    toolbarVisible ? 'toolbar-visible' : ''
  } ${isMobile ? 'mobile-padding' : ''}`;

  return (
    <form
      style={{ maxHeight: fixedHeight && isMobile ? fixedHeight : 'auto' }}
      onSubmit={(e) => e.preventDefault()}
      className={className}
    >
      <div className="form-group h-full">
        <ReactQuill
          className={quillClassName}
          style={boxStyle}
          theme="snow"
          value={noteContent}
          modules={modules}
          formats={formats}
          onChange={handleEditorChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Write here..."
        />
      </div>
    </form>
  );
};

export default Editor;
