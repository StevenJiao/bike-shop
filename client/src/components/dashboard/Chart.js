import {useEffect, Fragment, useRef }from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import dayjs from 'dayjs';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart({orderData}) {
  const theme = useTheme();
  const data = useRef([]);

  useEffect(() => {
    if (orderData.length > 0) {
      let reducedData = orderData.reduce((acc, order) => {
        let date = dayjs(order.orderDate).format('YYYY-MM-DD');
        (date in acc) ? acc[date] += order.totalPrice : acc[date] = order.totalPrice;
        return acc
      }, {})

      let freshData = []
      for (const date in reducedData) {
        freshData.push(createData(date, reducedData[date]))
      }
      data.current = freshData;
    }
  }, [orderData])

  return (
    <Fragment>
      <Title>All Time</Title>
      <ResponsiveContainer>
        <LineChart
          data={data.current}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
            <XAxis
                dataKey="time"
                stroke={
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900]
                }
                style={theme.typography.body2}
            >
                {/* <Label
                    position="middle"
                    style={{
                        textAnchor: 'middle',
                        fill: theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        ...theme.typography.body1,
                    }}
                >
                Date
                </Label> */}
            </XAxis>
            <YAxis
                stroke={
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900]
                }
                style={theme.typography.body2}
            >
                <Label
                    angle={270}
                    position="left"
                    style={{
                        textAnchor: 'middle',
                        fill: theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        ...theme.typography.body1,
                    }}
                >
                Sales ($)
                </Label>
            </YAxis>
            <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="amount"
                stroke={
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900]
                }
                dot={false}
            />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
}