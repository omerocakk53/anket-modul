import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeSelector = ({ onRangeChange }) => {
  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection
    onRangeChange({ startDate, endDate })
  }

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={[
        {
          startDate: addDays(new Date(), -30),
          endDate: new Date(),
          key: 'selection'
        }
      ]}
      className="rounded-md overflow-hidden border border-neutral-dark shadow"
    />
  )
}

export default DateRangeSelector
