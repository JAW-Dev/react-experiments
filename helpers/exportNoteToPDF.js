import html2pdf from 'html2pdf.js';
import { fetchNoteContent } from './apiCalls';

const exportNoteToPDF = async (note) => {
  try {
    const latestNote = await fetchNoteContent({
      behaviorId: note.notable_id
    });
    const { behavior_title: behaviorTitle, module_title: moduleTitle } = note;

    const { content } = latestNote;

    const formattedContent = `
		<div style="padding: 20mm;">
			<h4 style="font-size: 16pt; font-family: Arial, sans-serif; margin-bottom: 10pt;">${moduleTitle}</h4>
			<h2 style="font-size: 24pt; font-family: Arial, sans-serif; margin-bottom: 20pt;">${behaviorTitle}</h2>
			${content}
		</div>
	`;

    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${behaviorTitle.toLowerCase()}-notes.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(formattedContent).set(opt).save();
  } catch (error) {
    console.error('Error fetching latest note content:', error);
  }
};

export default exportNoteToPDF;
