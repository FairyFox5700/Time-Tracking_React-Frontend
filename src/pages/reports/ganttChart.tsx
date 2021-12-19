import React, { Dispatch, useEffect } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts-gantt';
import { RootState } from '../../store';
import CircularUnderLoad from '../../components/loader/circularLoader';
import { connect } from "react-redux";
import { IssueDetailedModel } from '../../types/issues/isues';
import { ApiPagedResponse, ApiResponse } from '../../types/api/apiResponses';

type GanttChartDataProps =  ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps> &{
    isLoading: boolean|undefined;
    errorMessage:string|undefined;
    issues:ApiPagedResponse<IssueDetailedModel>;
  };
  const getUtcDateSeconds = (date:Date) :number=>{
    console.log(date.toISOString());
    let dd = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay());
    return dd;
  }

  const getEndDate = (date:Date, seconds:number):Date =>{
    date.setSeconds(seconds);
    return date;
  }
const GanttChartData: React.FC<GanttChartDataProps> = ({
  isLoading,
  errorMessage,
  issues
}) => {

  useEffect(()=>{
    console.log("issues",issues);
  });
const options = {
  title: {
    text: 'Project Gantt Chart'
},  
series: [{
    name: 'Project 1',
    data: issues.data.map(i=>
    ({
    id:i.issueId,
    name:i.title,
    start: getUtcDateSeconds(new Date(i.openedAt as string)),
    end: getUtcDateSeconds(getEndDate(new Date(i.openedAt as string),i.totalRemainingTimeInSeconds)),
    })),
        //start: Date.UTC(new Date('2014-10-23').getFullYear(),new Date('2014/23/10 ').getMonth(),new Date('2014/10/23').getDate
}]
}



return isLoading ? (
  <CircularUnderLoad />
) : (<HighchartsReact
highcharts={Highcharts}
allowChartUpdate={false}
constructorType='ganttChart'
  options={options}
/>)
}

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.issues.loading,
  issues: state.issues.issues,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttChartData);