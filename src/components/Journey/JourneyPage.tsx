import React from 'react';
import ModernTimeline from './ModernTimeline';
import { TimelineItem, Constellation } from '../../../data/journeyData';

interface JourneyPageProps {
  timelineItems: TimelineItem[];
  constellations: Constellation[];
}

const JourneyPage: React.FC<JourneyPageProps> = ({ timelineItems, constellations }) => {
  return (
    <div className="journey-page">
      <ModernTimeline 
        timelineItems={timelineItems}
        constellations={constellations}
      />
    </div>
  );
};

export default JourneyPage; 