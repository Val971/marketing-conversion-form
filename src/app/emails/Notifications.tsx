import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface NotificationEmailProps {
  email?: string;
  name?: string;
  companyName?: string;
  phoneNumber?: string;
  design?: string;
  time?: string;
  budget?: string;
  serviceName?: string;
}
const baseUrl = process.env.BASE_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default function Email({ ...props }) {
  return (
    <Html>
      <Head />
      <Preview>Kaskod notification</Preview>
      <Body style={main}>
        <Container>
          <Section>
            <Img width={70} src={`${baseUrl}/logo_kaskod.png`} />
          </Section>
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={600}
                src={`${baseUrl}/notification.jpg`}
              />
            </Row>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Hi Valérie,
                </Heading>
                <Heading
                  as='h2'
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  We noticed a recent prospect form completion.
                </Heading>

                <Text style={paragraph}>
                  <b>Prospect information: </b>
                  <div className='grid grid-cols-1'>
                    <p> {props.name}</p>
                    <p>{props.email}</p>
                    <p>{props.companyName}</p>
                    <p>{props.phoneNumber}</p>
                  </div>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Project type: </b>
                  {props.serviceName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Budget: </b>
                  {props.budget}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Time: </b>
                  {props.time}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>design: </b>
                  {props.design}
                </Text>

                <a
                  style={paragraph}
                  className='underline'
                  href='https://kaskod.dev/'>
                  Go to KASKOD
                </a>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
Email.PreviewProps = {
  email: 'kaskod@kaskod.com',
  name: 'Kaskod',
  companyName: 'Kaskod',
  phoneNumber: '000-000-000',
  design: 'Lorem ipsum',
  time: 'Lorem ipsum dolor sit amet consectetur.',
  budget: 'Lorem ipsum dolor sit amet consectetur.',
  serviceName: 'Lorem ipsum dolor sit amet consectetur.',
} as NotificationEmailProps;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};
