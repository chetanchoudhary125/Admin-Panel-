import { Hero } from "../features/dashboard/Hero"
import { LastTransection } from "../features/payments/LastTransaction"
import { Discounts } from "../features/products/Discount"
// import { OrderHistory } from "../OrderHistory"

 const Dashboard = () => {
  return (
    <div className="min-w-0 space-y-5">
      <Hero />
      <Discounts />
      <LastTransection />
    </div>
  )
}

export default Dashboard

