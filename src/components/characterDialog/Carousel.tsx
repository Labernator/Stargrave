import { useState } from "react";
import ReactSwipe from "react-swipe";
import { CarouselSize } from "../../types/State";

export const Carousel = ({ inputDivs, splitSize, size }: { inputDivs: JSX.Element[] | null; splitSize: number; size?: CarouselSize }) => {
    let reactSwipeEl: ReactSwipe;
    const cnt = inputDivs?.length || 0;
    const sectionCnt = Math.ceil(cnt / splitSize);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const getContent = () => {
        const sectionDivs: JSX.Element[] = [];
        for (let i = 0; i < sectionCnt; i++) {
            sectionDivs.push(<div>{inputDivs?.slice((i * splitSize), (i + 1) * splitSize)}</div>);
        }
        return sectionDivs;
    };
    return (
        <div>
            <ReactSwipe
                className={size === CarouselSize.large ? "carousel large" : size === CarouselSize.medium ? "carousel medium" : "carousel"}
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
