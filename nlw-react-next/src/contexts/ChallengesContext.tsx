import { createContext, ReactNode, useState } from 'react';

interface ChallengensContexData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallegensProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengensContexData);


export function ChallengesProvider({ children } : ChallegensProviderProps ){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience ] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);


    function levelUp(){
      setLevel(level+1);
    }
    function startNewChallenge(){
        
    }
    
    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                levelUp,
                startNewChallenge
            }}
        > 
            {children}
        </ChallengesContext.Provider>
    );
}
