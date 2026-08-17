import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';

type StudentInfoProps = {
  avatarUri: string;
  name: string;
  studentId: string;
};

export default function StudentInfo({
  avatarUri,
  name,
  studentId,
}: StudentInfoProps) {
  return (
    <View style={styles.row}>
      <Avatar uri={avatarUri} />

      <View style={styles.textBlock}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.id}>
          Mã SV: {studentId}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textBlock: {
    marginLeft: 14,
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  id: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
});