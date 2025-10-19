import React, { useEffect, useState } from "react";
import { Text } from "react-native";

type CountdownTimerProps = {
    date: string;
    time: string;
    status: string;
};

export default function CountdownTimer({ date, time, status }: CountdownTimerProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatRemaining = (target: Date, current: Date) => {
        const diffMs = target.getTime() - current.getTime();
        if (diffMs <= 0) return null; 

        const totalMinutes = Math.floor(diffMs / 60000);
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        const minutes = totalMinutes % 60;

        const parts: string[] = [];
        if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
        if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

        if (parts.length === 0) return 'Less than a minute left';
        return `${parts.join(', ')} left`;
    };

    if (status !== "upcoming") return null;

    const eventDateTime = new Date(`${date}T${time}`);
    const remainingText = formatRemaining(eventDateTime, now);

    return remainingText ? (
        <Text className="text-gray-500 text-base mt-1">{remainingText}</Text>
    ) : null;
}