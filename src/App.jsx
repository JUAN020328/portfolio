import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BasicInfo from './components/BasicInfo'
import Skills from './components/Skills'
import OperationsWorks from './components/OperationsWorks'
import OtherWorks from './components/OtherWorks'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BasicInfo />
        <Skills />
        <OperationsWorks />
        <OtherWorks />
        <Contact />
      </main>
    </>
  )
}
