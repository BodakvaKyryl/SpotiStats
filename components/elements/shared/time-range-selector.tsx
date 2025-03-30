import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Limit, TimeRange } from "@/types";

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  limit: Limit;
  onTimeRangeChange: (event: SelectChangeEvent) => void;
  onLimitChange: (event: SelectChangeEvent) => void;
}

export const TimeRangeSelector = ({ timeRange, limit, onTimeRangeChange, onLimitChange }: TimeRangeSelectorProps) => {
  return (
    <div className="flex gap-4">
      <FormControl size="small">
        <InputLabel>Time Range</InputLabel>
        <Select value={timeRange} label="Time Range" onChange={onTimeRangeChange} className="min-w-[150px]">
          <MenuItem value="short_term">Last 4 Weeks</MenuItem>
          <MenuItem value="medium_term">Last 6 Months</MenuItem>
          <MenuItem value="long_term">All Time</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Limit</InputLabel>
        <Select value={limit} label="Limit" onChange={onLimitChange} className="min-w-[100px]">
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="50">50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
