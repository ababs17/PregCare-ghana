
export interface CycleData {
  currentDay: number;
  phase: string;
  nextPeriod: string;
  daysToOvulation: number;
  fertileWindow: {
    start: Date;
    end: Date;
  };
}

export const calculateCycleData = (lastPeriodStart: Date, averageCycleLength: number): CycleData => {
  const today = new Date();
  const timeDiff = today.getTime() - lastPeriodStart.getTime();
  const currentDay = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  
  // Calculate cycle phase
  let phase = 'Menstrual';
  if (currentDay <= 5) {
    phase = 'Menstrual';
  } else if (currentDay <= 13) {
    phase = 'Follicular';
  } else if (currentDay <= 16) {
    phase = 'Ovulatory';
  } else {
    phase = 'Luteal';
  }

  // Calculate next period
  const nextPeriodDate = new Date(lastPeriodStart);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + averageCycleLength);
  
  // Calculate ovulation (typically day 14 of a 28-day cycle)
  const ovulationDay = Math.round(averageCycleLength / 2);
  const daysToOvulation = ovulationDay - currentDay;

  // Fertile window (5 days before ovulation + ovulation day)
  const fertileStart = new Date(lastPeriodStart);
  fertileStart.setDate(fertileStart.getDate() + ovulationDay - 5);
  
  const fertileEnd = new Date(lastPeriodStart);
  fertileEnd.setDate(fertileEnd.getDate() + ovulationDay);

  return {
    currentDay,
    phase,
    nextPeriod: nextPeriodDate.toLocaleDateString(),
    daysToOvulation,
    fertileWindow: {
      start: fertileStart,
      end: fertileEnd
    }
  };
};

export const calculateDueDate = (lastMenstrualPeriod: Date): Date => {
  const dueDate = new Date(lastMenstrualPeriod);
  dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
  return dueDate;
};

export const calculateGestationalAge = (lastMenstrualPeriod: Date): number => {
  const today = new Date();
  const timeDiff = today.getTime() - lastMenstrualPeriod.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24 * 7)); // weeks
};
