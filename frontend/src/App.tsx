import { Container, Heading } from "./components"
import CTCInputPanel from "./components/CTCInput/CTCInputPanel"
import CTCReportCard from "./components/CTCReportCard/CTCReportCard"
import { useCtc } from "./store/ctcContext"

function App() {

  const { ctc, visibility } = useCtc()

  return (
    <div className={`bg-blue-100/40 w-full ${ctc > 0 || visibility ? "h-auto pb-5" : "h-screen"}  pt-10  `}>
      <Heading />
      <Container>
        <CTCInputPanel />
        <CTCReportCard />
      </Container>
    </div>
  )
}

export default App
