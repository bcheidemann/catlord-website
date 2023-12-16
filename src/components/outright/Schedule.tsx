import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  creatorName,
  streamItem,
  streamItemsList,
  streamLinkButton,
  streamTime,
} from "./schedule.css";

const queryClient = new QueryClient();

export const OutrightSchedule = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Schedule />
    </QueryClientProvider>
  );
};

const Schedule = () => {
  const query = useQuery("schedule", getSchedule);

  if (query.isLoading) {
    return <span>Loading...</span>;
  }

  if (query.isError) {
    console.error(query.error);
    return <span>ERROR</span>;
  }

  const schedule = query.data!;
  const byDay: Record<string, ScheduleItem[]> = {};

  for (const item of schedule) {
    if (!byDay[item.day]) {
      byDay[item.day] = [];
    }
    byDay[item.day]!.push(item);
  }

  return (
    <div>
      {Object.entries(byDay).map(([day, items]) => (
        <div key={day}>
          <h2 style={{ display: "inline-block" }}>{day}</h2>
          <ul className={streamItemsList}>
            {items.map((item, idx) => (
              <li key={idx} className={streamItem}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className={creatorName}>{item.creator}</h3>
                  {item.link && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}
                    >
                      <a
                        className={streamLinkButton}
                        href={item.link}
                        target="_blank"
                      >
                        Watch
                      </a>
                    </div>
                  )}
                </div>
                <span className={streamTime}>
                  {item.start}
                  {item.end && ` - ${item.end}`}
                </span>
                {item.info && <p style={{ margin: 0 }}>{item.info}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

async function getSchedule() {
  const res = await fetch(
    import.meta.env.PUBLIC_OUTRIGHT_API + "/api/schedule"
  );
  const schedule = await res.json();
  if (!Array.isArray(schedule)) {
    console.error("Invalid schedule data:", schedule);
    throw new Error("Invalid schedule data");
  }
  let DAY_IDX = 0;
  let CREATOR_IDX = 1;
  let START_IDX = 2;
  let END_IDX = 3;
  let LINK_IDX = 4;
  let INFO_IDX = 5;
  return schedule
    .map((item, idx) => {
      if (!Array.isArray(item)) {
        console.error("Invalid schedule item:", item);
        throw new Error("Invalid schedule item");
      }
      if (idx === 0) {
        for (const header of item) {
          switch (header) {
            case "DAY":
              DAY_IDX = item.indexOf(header);
              break;
            case "CREATOR":
              CREATOR_IDX = item.indexOf(header);
              break;
            case "START":
              START_IDX = item.indexOf(header);
              break;
            case "END":
              END_IDX = item.indexOf(header);
              break;
            case "LINK":
              LINK_IDX = item.indexOf(header);
              break;
            case "INFO":
              INFO_IDX = item.indexOf(header);
              break;
          }
        }
        return;
      }
      const day = item[DAY_IDX];
      const creator = item[CREATOR_IDX];
      const start = item[START_IDX];
      const end = item[END_IDX];
      const link = item[LINK_IDX];
      const info = item[INFO_IDX];
      const scheduleItem: ScheduleItem = {
        day,
        creator,
        start,
        end,
        link,
        info,
      };
      return scheduleItem;
    })
    .filter(Boolean) as ScheduleItem[];
}

type ScheduleItem = {
  day: string;
  creator: string;
  start: string;
  end?: string;
  link?: string;
  info?: string;
};
