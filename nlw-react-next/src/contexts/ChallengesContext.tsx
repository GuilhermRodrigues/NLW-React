import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye'
    description: string;
    amount: number;

}
interface ChallengensContexData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number
    activeChallenge: Challenge;
    
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    
}

interface ChallegensProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengensContexData);


export function ChallengesProvider({ children } : ChallegensProviderProps ){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience ] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel =  Math.pow((level + 1) * 4, 2);

    function levelUp(){
      setLevel(level+1);
    }
    function startNewChallenge(){
        const randomChallengIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengIndex];

        setActiveChallenge(challenge);
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    
    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                
            }}
        > 
            {children}
        </ChallengesContext.Provider>
    );
}
