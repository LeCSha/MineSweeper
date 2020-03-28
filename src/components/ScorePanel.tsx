import React from 'react';

const localStorage = window.localStorage;

function timeConverter(given_seconds: number) {
    const hours = Math.floor(given_seconds / 3600);
    const minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    const seconds = given_seconds - (hours * 3600) - (minutes * 60);
    
    const timeString = hours.toString().padStart(2, '0') + ':' + 
          minutes.toString().padStart(2, '0') + ':' + 
          seconds.toString().padStart(2, '0');
    return timeString;
}

export const ScorePanel: React.FC = () => {
    const times = localStorage.getItem('times');

    if (times) {
        const sortedTimes = times.split(' ').map(e => parseInt(e)).sort((a, b) => a - b);
        console.log(sortedTimes)
        let index = 0;
        return (
            <div className="scorePanel">
                <h2>Statistiques</h2>
                <ol>
                    {sortedTimes.map(score => {
                        return (
                            <li className="score" key={index++}>
                                {timeConverter(score)}
                            </li>
                        )
                    })}
                </ol>
            </div>
            )
    }
    return (<></>);
}
