import React from "react";
import { Eventcalendar, MbscCalendarEvent, MbscEventcalendarView, toast,  localeEn } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import client from "../api/clients/client";
import { apiUrls } from "../api/clients/config";
import { IssueDetailedModel } from "../types/issues/isues";

const colors = [
  "#7575FF",
  "#70DBB8",
  "#7093DB",
  "#93DB70",
  "#B870DB",
  "#8370DB"
]

const Calendar = () => {

  const [myEvents, setEvents] = React.useState<MbscCalendarEvent[]>([]);

  const mapIssueToEvent = (issue: IssueDetailedModel) => {
    const endDate = issue.closedAt
      ? new Date(issue.closedAt) > new Date(issue.openedAt!)
        ? new Date(issue.closedAt)
        : new Date()
      : new Date();

    const event: MbscCalendarEvent = {
      id: issue.issueId,
      title: issue.title,
      start: new Date(issue.openedAt!),
      end: endDate,
      editable: false,
      color: colors[Math.floor(Math.random() * colors.length + 1)-1],
    };
    return event;
  }

  const getEvents = async () => {
    const issues: IssueDetailedModel[] = (await client.get(`${apiUrls.timeTrackingApi}/issue?Page=${0}&PageSize=${0}`)).data.data;
    const events = issues.map(mapIssueToEvent);
    setEvents(events);
  }

  React.useEffect(() => {
    getEvents();
  }, []);

  const view = React.useMemo<MbscEventcalendarView>(() => {
    return {
      calendar: { labels: true },
    };
  }, []);
    
  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  return (
    <div className="app_bar main">
      <h1>Calendar</h1>
      <Eventcalendar
        data={myEvents}
        theme="material"
        themeVariant="light"
        view={view}
        onEventClick={onEventClick}
        locale={localeEn}
        defaultSelectedDate={new Date()}
        height={800}
      />
    </div>
  );
}

export default Calendar;
