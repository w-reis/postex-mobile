import React, { useCallback, useEffect, useState } from 'react';

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import Menu from '../../components/Menu';

import letter from '../../assets/letter.png';
import check from '../../assets/check.png';
import attention from '../../assets/attention.png';
import cellphone from '../../assets/cellphone.png';

import {
  Container,
  Username,
  Subtitle,
  Card,
  CardText,
  CardSubtitle,
  ResumeCard,
  ResumeCardText,
} from './styles';

interface info {
  total: number;
  last: string;
}

interface CorrespondencesInfoProps {
  all: info;
  retired: info;
  pending: info;
}

const Dashboard: React.FC = () => {
  const { token, recipient, signOut } = useAuth();

  const [correspondencesInfo, setCorrespondencesInfo] = useState<
    CorrespondencesInfoProps
  >({
    all: {
      total: 0,
      last: '',
    },
    retired: {
      total: 0,
      last: '',
    },
    pending: {
      total: 0,
      last: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const loadCorrespondencesInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `correspondences/count?id=${recipient.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCorrespondencesInfo(response.data);
    } catch (err) {
      Alert.alert(
        'Sua sessão expirou!',
        'Faça login novamente para utilizar o Postex.',
      );

      signOut();
    } finally {
      setLoading(false);
    }
  }, [recipient.id, token, signOut]);

  useEffect(() => {
    loadCorrespondencesInfo();
  }, [loadCorrespondencesInfo]);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0748b4" />
        </View>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          <Menu />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <Container>
              {correspondencesInfo?.all.total > 0 ? (
                <>
                  <Username>{recipient.name.split(' ')[0]}</Username>
                  <Subtitle>Você tem</Subtitle>
                  <Image source={letter} />
                  <Card>
                    <CardText>{`${correspondencesInfo?.all.total} correspondências`}</CardText>
                    {correspondencesInfo?.all.last !== '' && (
                      <CardSubtitle>
                        {`Última: ${correspondencesInfo?.all.last}`}
                      </CardSubtitle>
                    )}
                  </Card>
                  <ResumeCard color="#1ECD8C">
                    <View>
                      <ResumeCardText color="#1ECD8C">{`${correspondencesInfo?.retired.total} retiradas`}</ResumeCardText>
                      {correspondencesInfo?.retired.last !== '' && (
                        <CardSubtitle>{`Última: ${correspondencesInfo?.retired.last}`}</CardSubtitle>
                      )}
                    </View>
                    <Image source={check} />
                  </ResumeCard>
                  <ResumeCard color="#FA4F3B">
                    <View>
                      <ResumeCardText color="#FA4F3B">{`${correspondencesInfo?.pending.total} pendentes`}</ResumeCardText>
                      {correspondencesInfo?.pending.last !== '' && (
                        <CardSubtitle>{`Última: ${correspondencesInfo?.retired.last}`}</CardSubtitle>
                      )}
                    </View>
                    <Image source={attention} />
                  </ResumeCard>
                </>
              ) : (
                <>
                  <Username>{recipient.name.split(' ')[0]}</Username>
                  <Subtitle>
                    Você ainda não recebeu nenhuma correspondência
                  </Subtitle>
                  <Image
                    source={cellphone}
                    style={{ marginVertical: 30, width: 200, height: 189.07 }}
                    width={200}
                    height={189.07}
                  />
                  <Subtitle>
                    Fique de olho, elas aparecerão aqui para você ficar sabendo
                  </Subtitle>
                </>
              )}
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Dashboard;
