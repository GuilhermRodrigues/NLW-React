import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
interface Challenge {
    type: 'body' | 'eye';
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
    completeChallenge: () => void;
    
}

interface ChallegensProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
      
}

export const ChallengesContext = createContext({} as ChallengensContexData);


export function ChallengesProvider({ children, ...rest} : ChallegensProviderProps ){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel =  Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
      setLevel(level+1);
    }
    function startNewChallenge(){
        const randomChallengIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengIndex];

        setActiveChallenge(challenge);
        /*
        var audio = new Audio('/notification.mp3');
        audio.load();
        audio.play();
        */

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ',{
                body: `Valendo ${challenge.amount}xp`
            });
        }
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const{ amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
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
                completeChallenge,
            }}
        > 
            {children}
        </ChallengesContext.Provider>
    );
}
