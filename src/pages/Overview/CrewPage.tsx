import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CharacterComponent } from "../../components/CharacterComponent";
import { Carousel } from "../../components/common/Carousel";
import { SoldierComponent } from "../../components/SoldierComponent";
import { StatusbarComponent } from "../../components/statusbar/StatusBarComponent";
import { CrewState, Soldier } from "../../types";

export const CrewPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const myStorage = localStorage;
    const areEqual = (list: Soldier[]) => {
        const { id: renamed, ...restFirstItem } = list[0];
        return list.every((val) => {
            const { id, ...restVal } = val;
            return JSON.stringify(restVal) === JSON.stringify(restFirstItem);
        });
    };

    myStorage.setItem(`${state.ShipName}_${state.Captain.name}_${state.Captain.level}_${state.FirstMate.level}_${state.Credits}`, JSON.stringify(state));
    return <React.Fragment>
        {state.Captain && state.FirstMate && state.Soldiers ?
            <React.Fragment>
                <StatusbarComponent key="statusbarComponent" />
                <div key="crewRoster" id="crewRoster" style={{ paddingTop: "0.5rem" }}>
                    <Carousel
                        splitSize={4}
                        inputDivs={[
                            <CharacterComponent key="captainComponent" isCaptain={true} />,
                            <CharacterComponent key="firstMateComponent" isCaptain={false} />,
                            ...state.Soldiers.reduce((acc, sol) => {
                                const x = state.Soldiers.filter((sold) => sold.type === sol.type);
                                if (areEqual(x) && acc.filter((sold) => sold.type === sol.type).length === 0) {
                                    return [...acc, { ...sol, amount: x.reduce((sum, y) => sum + y.amount, 0) }];
                                }
                                if (!areEqual(x)) {
                                    return [...acc, sol];
                                }
                                return acc;
                                // return areEqual(x) && acc.filter((sold) => sold.type === sol.type).length > 0 ? acc : [...acc, { ...sol, amount: x.length }];
                            }, [] as Soldier[]
                            ).map((soldier) => <SoldierComponent key={`crew_member_${soldier.type}`} soldier={soldier} />),
                        ]}
                    />
                </div>
            </React.Fragment> : null
        }
    </React.Fragment>;
};
