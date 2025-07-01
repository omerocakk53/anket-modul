import { useState, useEffect } from 'react'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeSelector = ({ onRangeChange }) => {
  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
      key: 'selection',
    },
  })

  useEffect(() => {
    onRangeChange(state.selection)
  }, [state.selection, onRangeChange])

  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setState({ ...state, ...item })}
      moveRangeOnFirstSelection={false}
      ranges={[state.selection]}
      className="rounded-md overflow-hidden border border-neutral-dark shadow"
    />
  )
}

export default DateRangeSelector
