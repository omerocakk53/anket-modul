import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const SurveyComparisonChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-primary-dark mb-4">Soru Bazlı Karşılaştırma</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="firstPeriod" fill="#4F46E5" name="1. Tarih" radius={[4, 4, 0, 0]} />
          <Bar dataKey="secondPeriod" fill="#10B981" name="2. Tarih" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SurveyComparisonChart
