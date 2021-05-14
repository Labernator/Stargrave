import { useState } from "react";
import ReactSwipe from "react-swipe";

export const Carousel = ({ inputDivs }: { inputDivs: JSX.Element[] | null }) => {
    let reactSwipeEl: ReactSwipe;
    const cnt = inputDivs?.length || 0;
    const sectionCnt = Math.floor(cnt / 7);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const getContent = () => {
        const sectionDivs: JSX.Element[] = [];
        for (let i = 0; i < sectionCnt; i++) {
            sectionDivs.push(<div>{inputDivs?.slice((i * 7), (i + 1) * 7)}</div>);
        }
        return sectionDivs;
    };
    return (
        <div>
            <ReactSwipe
                className="carousel"
                swipeOptions={{
                    continuous: false,
                }}
                ref={(el: ReactSwipe) => (reactSwipeEl = el)}
                childCount={sectionCnt}
            >
                {getContent()}
            </ReactSwipe>
            <div style={{ display: "inline-grid", width: "100%" }}>
                <button
                    className={currentSection === 1 ? "carousel-btn disabled" : "carousel-btn"}
                    onClick={() => {
                        setCurrentSection(reactSwipeEl.getPos());
                        reactSwipeEl.prev();
                    }}
                >{"<"}</button>
                <div style={{ gridArea: "1", placeSelf: "center" }}>{`${currentSection} / ${sectionCnt}`}</div>
                <button
                    className={(currentSection === sectionCnt) ? "carousel-btn disabled" : "carousel-btn"}
                    onClick={() => {
                        setCurrentSection(reactSwipeEl.getPos() + 2);
                        reactSwipeEl.next();
                    }}
                >{">"}</button>
            </div>
        </div>
    );
};
