from datetime import datetime, timedelta


class TimeOfWeek:
    """
    Wrapper class of the built-in datetime to represent time in
    a weekday by keeping year=1990 and month=1
    """
    def __init__(self, time_str: str):
        """
        Init TimeOfWeek object by providing time_str in format `%d %H:%M`.
        :param time_str: String representing time of a week
        """
        assert '1' <= time_str[0] <= '7'
        self._time = datetime.strptime(time_str, '%d %H:%M')

    @property
    def time(self) -> datetime:
        return self._time

    @time.setter
    def time(self, time_str: str = None):
            self._time = datetime.strptime(time_str, '%d %H:%M')

    def __str__(self):
        return self.time.strftime('%a %H:%M')

    def __lt__(self, other):
        return self.time < other.time

    def __le__(self, other):
        return self.time <= other.time

    def __gt__(self, other):
        return self.time > other.time

    def __ge__(self, other):
        return self.time >= other.time

    def __eq__(self, other):
        return self.time == other.time

    def __sub__(self, other) -> timedelta:
        return self.time - other.time


class TimeSlot:
    def __init__(self, start, end):
        if type(start) is str:
            self._start = TimeOfWeek(time_str=start)
            self._end = TimeOfWeek(time_str=end)
        elif type(start) is TimeOfWeek:
            self._start = start
            self._end = end
        else:
            raise NotImplementedError
        assert self._start <= self._end, \
            f'start ({self._start}) > end ({self._end})'
        self._update_duration()

    @property
    def start(self) -> TimeOfWeek:
        return self._start

    @start.setter
    def start(self, time_str):
        tmp_start = TimeOfWeek(time_str)
        assert tmp_start <= self.end, \
            f'start ({tmp_start}) > end ({self.end})'
        self._start = tmp_start
        self._update_duration()

    @property
    def end(self) -> TimeOfWeek:
        return self._end

    @end.setter
    def end(self, time_str):
        tmp_end = TimeOfWeek(time_str)
        assert self.start <= tmp_end, \
            f'start ({self.start}) > end ({tmp_end})'
        self._end = tmp_end
        self._update_duration()

    @property
    def duration(self) -> timedelta:
        return self._duration

    def _update_duration(self) -> None:
        self._duration = self._end - self._start

    # def dist_from(self, other) -> timedelta:
    #     """
    #     :return: distance between this and the other time slot, negative in case of overlap
    #     """
    #     return max(self.start, other.start) - \
    #            min(self.end, other.end)

    def overlap(self, other):
        """
        :return Union(TimeSlot, None): Overlapping time slot if
                there is an overlap, otherwise return None.
        """
        max_start = max(self.start, other.start)
        min_end = min(self.end, other.end)
        if max_start < min_end:
            return TimeSlot(max_start, min_end)
        return None

    def is_friday(self):
        return self.start.time.isoweekday() == 5

    def is_morning(self):
        return self.start.time.hour < 10

    def is_noon(self):
        return 12 <= self.start.time.hour < 14 \
               or 12 <= self.end.time.hour < 14

    def __str__(self):
        ts = f'[{self.start} -- {self.end}]'
        dur = f'({self.duration})'
        return ts + '  ' + dur


if __name__ == "__main__":

    ts1 = TimeSlot('1 8:30', '1 9:50')
    ts2 = TimeSlot('1 9:49', '1 10:10')
    ts3 = TimeSlot('1 10:00', '1 12:00')
    # print(ts1.isMorning())
    # print(f'#1 {ts1}')
    # print(f'#2 {ts2}')
    # print(f'#3 {ts3}')
    # print(ts1.overlap(ts2))
    # print(ts2.overlap(ts3))
    # print(ts1.overlap(ts3))

    # ts3.start = '1 8:00'
    # print(f'#3 {ts3}')
    # print(ts1.overlap(ts3))
