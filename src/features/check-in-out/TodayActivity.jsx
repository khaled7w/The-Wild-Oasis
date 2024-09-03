import styled from 'styled-components';
import { useTodayActivity } from './useTodayActivity';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

/*eslint-disable*/
const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

/*eslint-disable*/
const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();
  console.log(activities);
  return (
    <StyledToday>
      <Row type="vertical">
        <Heading as="h2">Today</Heading>

        {!isLoading ? (
          activities?.length > 0 ? (
            <TodayList>
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </TodayList>
          ) : (
            <NoActivity>No Activity</NoActivity>
          )
        ) : (
          <Spinner />
        )}
      </Row>
    </StyledToday>
  );
}

export default TodayActivity;
