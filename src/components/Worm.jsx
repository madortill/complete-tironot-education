import React, { useEffect, useState } from "react";
import '../css/meetEducation.css';

const groups = [
  {
    id: "ivrit",
    title: 'מש״ק עברית',
    description: "לימוד עברית לחיילים",
  },
  {
    id: "hshomer",
    title: 'מפק״צ בחוות השומר ומחווה אלון',
    description: "טירונות לאוכלוסיות מיוחדות",
  },
  {
    id: "siba",
    title: 'מש״ק סיבה',
    description: "העברת הסברות לשילוב אוכלוסיות מיוחדות",
  },
  {
    id: "haskala",
    title: "מפקד בקורס השכלה",
    description: "השלמת תעודת בגרות",
  },
  {
    id: "nativ",
    title: 'מפק״צ קורס נתיב',
    description: "קורס לחיילים שאינם יהודים ומעוניינים בגיור",
  },
];

function Worm({ onCompleteChange }) {
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [clickedGroups, setClickedGroups] = useState([]);

  const activeGroup = groups.find((group) => group.id === activeGroupId);
  const allGroupsDone = clickedGroups.length === groups.length;

  useEffect(() => {
    if (allGroupsDone) {
      onCompleteChange?.(true);
    }
  }, [allGroupsDone, onCompleteChange]);

  const handleGroupClick = (id) => {
    setActiveGroupId(id);

    setClickedGroups((previousGroups) => {
      if (previousGroups.includes(id)) {
        return previousGroups;
      }

      return [...previousGroups, id];
    });
  };

  return (
    <div className="worm-cards" dir="rtl">
      <div className="worm-cards__grid">
        {groups.map((group) => {
          const isActive = activeGroupId === group.id;
          const isDone = clickedGroups.includes(group.id);

          return (
            <button
              key={group.id}
              type="button"
              className={`worm-card ${isActive ? "worm-card--active" : ""} ${
                isDone ? "worm-card--done" : ""
              }`}
              onClick={() => handleGroupClick(group.id)}
              aria-pressed={isActive}
            >
              {isDone && (
                <span className="worm-card__check" aria-hidden="true">
                  ✓
                </span>
              )}

              <span className="worm-card__title">{group.title}</span>
            </button>
          );
        })}
      </div>

      <div className="worm-cards__details-area">
        {!activeGroup && (
          <p className="worm-cards__instruction">
            לחצו על כל אחד מהריבועים כדי לקרוא על המגמות.
          </p>
        )}

        {activeGroup && (
          <div key={activeGroup.id} className="worm-details">
            <p className="worm-details__title">{activeGroup.title}</p>
            <p className="worm-details__text">{activeGroup.description}</p>
          </div>
        )}
      </div>

      <p
        className={`worm-cards__progress ${
          allGroupsDone ? "worm-cards__progress--done" : ""
        }`}
      >
        {allGroupsDone
          ? "סיימתם לעבור על כל המגמות!"
          : `${clickedGroups.length} מתוך ${groups.length} מגמות נפתחו`}
      </p>
    </div>
  );
}

export default Worm;