import PageHeading from '../layout/PageHeading';
import { useCaseSession } from '../../hooks/useCaseSession';
import CaseLanding from './CaseLanding';
import WalkthroughView from './WalkthroughView';
import PracticePlaceholder from './PracticePlaceholder';

export default function CasePage({ caseType, title }) {
  const session = useCaseSession(caseType);

  const showWalkthrough =
    session.view === 'walkthrough' ||
    (session.view === 'landing' && session.loading);

  return (
    <div className="case-page">
      <PageHeading>{title}</PageHeading>

      {session.view === 'landing' && !session.loading && (
        <CaseLanding
          onStartWalkthrough={session.startWalkthrough}
          onStartPractice={session.startPractice}
          onSkipToPractice={session.skipToPractice}
          walkthroughDoneToday={session.walkthroughDoneToday}
          loading={session.loading}
        />
      )}

      {showWalkthrough && (
        <WalkthroughView
          walkthroughCase={session.walkthroughCase}
          practiceCase={session.practiceCase}
          loading={session.loading}
          error={session.error}
          onRetry={session.retryGenerate}
          onStartPractice={session.startPractice}
          onSaveToReviewBank={session.saveToReviewBank}
          saving={session.saving}
          saved={session.saved}
        />
      )}

      {session.view === 'practice' && (
        <PracticePlaceholder
          practiceCase={session.practiceCase}
          onBack={session.goToLanding}
        />
      )}
    </div>
  );
}
