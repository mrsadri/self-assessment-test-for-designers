import { Navigate, Route, Routes } from 'react-router-dom';
import { RunProvider } from '@/state/run';
import { IntroPage } from '@/pages/IntroPage';
import { SetupPage } from '@/pages/SetupPage';
import { QuestionPage } from '@/pages/QuestionPage';
import { ResultPage } from '@/pages/ResultPage';

function App() {
  return (
    <RunProvider>
      <div className="mx-auto min-h-svh w-full max-w-2xl px-4 py-8">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/q/:n" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </RunProvider>
  );
}

export default App;
