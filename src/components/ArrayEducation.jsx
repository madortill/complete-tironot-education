import React, { useEffect, useState } from "react";
import "../css/meetEducation.css";

import nextBtn from "../assets/images/introduction/nextBtn.png";

import goal from "../assets/images/meetEducation/goal.png";
import mashakEdu from "../assets/images/meetEducation/mashakEdu.png";
import mashakExp from "../assets/images/meetEducation/mashakExp.png";
import arrow from "../assets/images/meetEducation/arrow.png";

function ArrayEducation({ finish, progress, setProgress }) {
  const [openGoal, setOpenGoal] = useState(false);

  const {
    hasClickedGoal,
    selectedTrack,
    currentIndex,
    finishedTracks,
  } = progress;

  const textsMashakEdu = [
    "מש״ק החינוך ישתבץ בסיום הקורס ביחידה ספציפית אליה הוא יהיה משויך (בשונה ממש״ק ההסברה אשר אליו מגיעות יחידות שונות בכל פעם). תפקידו הינו קידום תחום החינוך ביחידה זו.",

    "מש״ק החינוך עושה זאת ע״י גיבוש תכנית חינוך ליחידה, דרבון מפקדי היחידה לעיסוק בחינוך, ושאיפה להיכרות עם חיילי היחידה וצרכי החינוך ביחידה.",

    "מש״ק החינוך לרוב לא יעביר את תכני החינוך, אלא יכין אותם מאחורי הקלעים ויתדרך את המפקדים להעברתם, מתוך ההבנה בחשיבות שהמפקד יהיה הדמות החינוכית עבור החיילים ביחידה.",
  ];

  const textsMashakExp = [
    "מש״קי ההסברה משתבצים באזור בארץ אותו הם לומדים ומכירים היטב. הם מעבירים הדרכות (הסברות) ליחידות מתחלפות שמגיעות אליהן.",

    "התכנים המועברים בהסברות יהיו בהתאמה לבקשות המפקדים, ערכי חיל החינוך ובזיקה לאזור בארץ בו הם מתמקצעים. לרוב ההסברות יעברו באותו האזור ואף כחלק מסיור.",
  ];

  const currentTexts =
    selectedTrack === "edu" ? textsMashakEdu : textsMashakExp;

  const canFinish = finishedTracks.edu && finishedTracks.exp;

  useEffect(() => {
    if (!selectedTrack) return;

    const texts =
      selectedTrack === "edu" ? textsMashakEdu : textsMashakExp;

    const isLast = currentIndex === texts.length - 1;

    if (isLast && !finishedTracks[selectedTrack]) {
      setProgress({
        finishedTracks: {
          ...finishedTracks,
          [selectedTrack]: true,
        },
      });
    }
  }, [currentIndex, selectedTrack]);

  return (
    <div className="array-education-screen">
      <div className="page array-education-page">
        <p className="title-content">מערך חינוך</p>

        <img
          src={goal}
          alt="מטרת מערך החינוך"
          className={`goal-img-arrEdu ${
            !hasClickedGoal ? "grow-shrink" : ""
          }`}
          onClick={() => {
            setOpenGoal(true);
          }}
        />

        {hasClickedGoal && (
          <>
            <p className="sec-title-content">מקצועות המערך:</p>

            <p className="text-swich-micro">
              לחצו על הריבועים!
            </p>

            <div className="container-mashakim">
              <img
                src={mashakEdu}
                alt="מש״ק חינוך"
                className={`mashakEdu ${
                  selectedTrack === "edu" ? "glow" : ""
                }`}
                onClick={() => {
                  setProgress({
                    selectedTrack: "edu",
                    currentIndex: 0,
                  });
                }}
              />

              <img
                src={mashakExp}
                alt="מש״ק הסברה"
                className={`mashakExp ${
                  selectedTrack === "exp" ? "glow" : ""
                } ${!finishedTracks.edu ? "locked" : ""}`}
                onClick={() => {
                  if (!finishedTracks.edu) return;

                  setProgress({
                    selectedTrack: "exp",
                    currentIndex: 0,
                  });
                }}
              />
            </div>

            {selectedTrack && (
              <div className="professeion-edu-contianer fade-in">
                <p className="text-swich">
                  {currentTexts[currentIndex]}
                </p>

                <div className="arrows-container">
                  <img
                    src={arrow}
                    alt="לטקסט הקודם"
                    className={`arrow-right ${
                      currentIndex === 0 ? "hidden-arrow" : ""
                    }`}
                    onClick={() => {
                      if (currentIndex > 0) {
                        setProgress({
                          currentIndex: currentIndex - 1,
                        });
                      }
                    }}
                  />

                  <img
                    src={arrow}
                    alt="לטקסט הבא"
                    className={`arrow-left ${
                      currentIndex === currentTexts.length - 1
                        ? "hidden-arrow"
                        : ""
                    }`}
                    onClick={() => {
                      if (currentIndex < currentTexts.length - 1) {
                        setProgress({
                          currentIndex: currentIndex + 1,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* הכפתור בתוך העמוד ובזרימה הרגילה */}
        <img
          src={nextBtn}
          alt="הבא"
          className={`nextBtn nav-btns array-education-next-btn ${
            !canFinish ? "disabled-btn-edu" : ""
          }`}
          onClick={() => {
            if (canFinish) {
              finish();
            }
          }}
        />
      </div>

      {openGoal && (
        <div
          className="popup-overlay"
          onClick={() => {
            setOpenGoal(false);
            setProgress({
              hasClickedGoal: true,
            });
          }}
        >
          <div
            className="popup-content"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="goal-text-title">
              מטרת מערך החינוך
            </p>

            <p className="goal-text">
              מערך הנועד לענות על ייעודו של חיל החינוך בעיקר בתחום
              הפיקודי-חינוכי.
            </p>

            <p className="goal-text">
              מטרת המערך היא להטמיע את ערכי צה"ל ביחידות השונות ולהוביל
              תהליכים חינוכיים אשר תומכים את המשימה הצבאית.
            </p>

            <p
              className="close-goal-btn"
              onClick={() => {
                setOpenGoal(false);
                setProgress({
                  hasClickedGoal: true,
                });
              }}
            >
              סגור
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArrayEducation;