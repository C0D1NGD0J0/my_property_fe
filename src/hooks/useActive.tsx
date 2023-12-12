import { throttle } from "@utils/helperFN";
import { useEffect, useState, useRef, useCallback } from "react";

const useIdleTimer = (
  idleTime: number, // Time in minutes to determine inactivity
  checkInterval: number = 10000, // Interval to check for inactivity
) => {
  const idleTimeInMilliseconds = idleTime * 60000;
  const [isIdle, setIdle] = useState(false); // State to track if user is idle
  const lastActivityTimeRef = useRef(Date.now()); // Ref to store the last activity time

  // Function to check inactivity
  const checkInactivity = useCallback(() => {
    // Check if the current time - last activity time is greater than idleTime
    if (Date.now() - lastActivityTimeRef.current > idleTimeInMilliseconds) {
      if (!isIdle) {
        setIdle(true); // Set user as idle
      }
    } else {
      setIdle(false); // Reset idle state
    }
  }, [idleTimeInMilliseconds, isIdle]);

  // Function to update the last activity time
  const updateLastActivityTime = useCallback(() => {
    lastActivityTimeRef.current = Date.now(); // Update last activity time
    if (isIdle) setIdle(false); // Reset idle state if user was idle
  }, [isIdle]);

  // Calculate the remaining time
  const getRemainingTime = () => {
    const timeElapsed = Date.now() - lastActivityTimeRef.current;
    return Math.max(idleTimeInMilliseconds - timeElapsed, 0);
  };

  // Effect to set up and clean event listeners and interval
  useEffect(() => {
    const intervalId = setInterval(checkInactivity, checkInterval); // Set interval to check inactivity
    const events: string[] = [
      "keypress",
      "touchmove",
      "mousemove",
      "click",
      "scroll",
    ];
    // Throttle function to limit frequent calls
    const throttledUpdateLastActivityTime = throttle(
      updateLastActivityTime,
      2000,
    );
    events.forEach((event) =>
      window.addEventListener(event, throttledUpdateLastActivityTime),
    );

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Clear interval
      events.forEach((event) =>
        window.removeEventListener(event, throttledUpdateLastActivityTime),
      );
    };
  }, [checkInactivity, updateLastActivityTime, checkInterval]);

  return isIdle; // Return the idle state
};

export default useIdleTimer;
