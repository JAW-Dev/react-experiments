import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import GiftIcon from '../../../../assets/images/reskin-images/icon--gift.svg';
import CustomHorizontalCarousel from './CustomHorizontalCarousel';
import HabitCard from './HabitCard';
import useResponsive from '../hooks/useResponsive';
import Button from './Button';
import Editor from './Editor';

const ListedNumbers = ({ data }) => (
  <div className="flex flex-col w-full py-8">
    {data.map((item) => {
      const { position, description } = item;

      return (
        <>
          <div style={{ gap: '16px' }} className="flex">
            <div
              style={{
                boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.15)',
                minWidth: '48px',
                minHeight: '48px',
              }}
              className="text-charcoal font-sans font-bold h-12 w-12 rounded-full flex items-center justify-center"
            >
              {position}
            </div>
            <p className="font-sans text-charcoal text-lg">{description}</p>
          </div>
          {position < data.length && (
            <span className="w-full h-px bg-gray my-6" />
          )}
        </>
      );
    })}
  </div>
);

const GiftTab = ({ displayed }) => (
  <div className="flex flex-col items-center py-10">
    <p className="font-inter text-charcoal mb-6">
      For $25, you can gift the behavior{' '}
      <strong>{displayed.behavior.title}</strong> to another leader. It&apos;s a
      decision we celebrate. Thank you for helping them lead through your
      generosity.
    </p>

    <Button
      href={`/program/orders/new?behavior=${displayed.behavior.slug}&course=${displayed.module.slug}`}
    >
      Gift This Behavior
    </Button>
  </div>
);

const ContentTabs = ({ behaviorDetails, displayed }) => {
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    if (
      behaviorDetails.behavior_maps &&
      behaviorDetails.behavior_maps.length > 0
    ) {
      setActiveTab('behavior_maps');
    } else {
      setActiveTab('notes');
    }
  }, [behaviorDetails]);

  const tabsConfig = [
    { label: 'Behavior Map', property: 'behavior_maps' },
    { label: 'Take a Note', property: 'notes' },
    { label: 'Examples', property: 'examples' },
    { label: 'Discussion Questions', property: 'questions' },
    { label: 'Exercises', property: 'exercises' },
    {
      label: <SVG src={GiftIcon} />,
      property: 'gift',
      className: '',
      hide: displayed.module.title === 'Foundations',
    },
  ];

  const renderTab = (tabConfig) => {
    const { label, property, className, hide } = tabConfig;
    if (
      property === 'gift' ||
      property === 'notes' ||
      (behaviorDetails[property] && behaviorDetails[property].length > 0)
    ) {
      return (
        <button
          type="button"
          key={label}
          className={`${
            activeTab === property ? 'text-link-purple' : 'text-charcoal'
          } ${className} ${
            hide && 'hidden'
          } pb-2 px-2 relative font-sans font-bold whitespace-no-wrap`}
          onClick={() => setActiveTab(property)}
        >
          {label}
          {activeTab === property && (
            <span className="absolute pin-b pin-l w-full h-px bg-link-purple" />
          )}
        </button>
      );
    }
  };

  const { isTablet } = useResponsive();

  return (
    <div
      style={{ boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.1)' }}
      className="w-full rounded-2lg p-6 relative"
    >
      <div className="border-b border-gray-dark flex w-full">
        <CustomHorizontalCarousel>
          <div style={{ gap: '32px' }} className="p-0 flex">
            {tabsConfig.map((tabConfig) => renderTab(tabConfig))}
          </div>
        </CustomHorizontalCarousel>
      </div>

      <div className="w-full flex justify-center mt-4">
        <div
          style={{
            maxHeight: !isTablet && activeTab !== 'notes' && '800px',
          }}
          className={`${
            activeTab !== 'notes' &&
            'customized-scrollbar  lg:overflow-y-scroll'
          } -mx-10 px-10 w-full`}
        >
          {activeTab === 'notes' && (
            <Editor
              className="-mx-10"
              behavior={displayed.behavior}
              module={displayed.module}
            />
          )}
          {activeTab === 'examples' && (
            <ListedNumbers data={behaviorDetails.examples} />
          )}
          {activeTab === 'questions' && (
            <ListedNumbers data={behaviorDetails.questions} />
          )}
          {activeTab === 'exercises' && (
            <ListedNumbers data={behaviorDetails.exercises} />
          )}
          {activeTab === 'behavior_maps' && (
            <div className="w-full py-8">
              {behaviorDetails.behavior_maps.map((item) => (
                <>
                  <HabitCard habit={item} />
                  {item.position < behaviorDetails.behavior_maps.length && (
                    <span className="w-full h-px bg-gray my-6 flex" />
                  )}
                </>
              ))}
            </div>
          )}
          {activeTab === 'gift' && <GiftTab displayed={displayed} />}
        </div>
      </div>
    </div>
  );
};

export default ContentTabs;
