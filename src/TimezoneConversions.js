import React from 'react';
import { TableView, TableHeader, TableBody, Column, Row, Cell, View } from '@adobe/react-spectrum';
import ThumbsUp from '@spectrum-icons/workflow/ThumbUp';
import ThumbsDown from '@spectrum-icons/workflow/ThumbDown';
import './App.css'; // Ensure the CSS file is imported

function TimezoneConversions({ selectedDateTime }) {
  const cities = [
    { city: 'San Jose', zone: 'America/Los_Angeles' },
    { city: 'Austin', zone: 'America/Chicago' },
    { city: 'NYC', zone: 'America/New_York' },
    { city: 'London', zone: 'Europe/London' },
    { city: 'Bucharest', zone: 'Europe/Bucharest' },
    { city: 'Bangalore', zone: 'Asia/Kolkata' },
    { city: 'Tokyo', zone: 'Asia/Tokyo' },
  ];

  const conversions = cities.map(({ city, zone }) => {
    const convertedTime = selectedDateTime.setZone(zone);
    return {
      city,
      time: convertedTime.toFormat('hh:mm a'),
      day: convertedTime.toFormat('cccc'),
      workingHour: convertedTime.hour >= 9 && convertedTime.hour < 17,
    };
  });

  return (
    <div>
      <h2>Timezone conversions</h2>
      <View width="100%">
        <TableView aria-label="Timezone Conversions" width="100%">
          <TableHeader>
            <Column key="status" allowsResizing maxWidth={50}> </Column>
            <Column key="city" allowsResizing>City</Column>
            <Column key="day" allowsResizing>Day</Column>
            <Column key="time" allowsResizing>Time</Column>
          </TableHeader>
          <TableBody>
            {conversions.map((conversion, index) => (
              <Row key={index}>
                <Cell>
                  {conversion.workingHour ? (
                    <>
                      <ThumbsUp aria-hidden="true" UNSAFE_className="thumbs-up" />
                      <span className="sr-only">Working hour</span>
                    </>
                  ) : (
                    <>
                      <ThumbsDown aria-hidden="true" UNSAFE_className="thumbs-down" />
                      <span className="sr-only">Non-Working hour</span>
                    </>
                  )}
                </Cell>
                <Cell>{conversion.city}</Cell>
                <Cell>{conversion.day}</Cell>
                <Cell>{conversion.time}</Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </View>
    </div>
  );
}

export default TimezoneConversions;