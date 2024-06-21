import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightRatio, widthRatio} from '../../Components/screenSize';
import AntDesign from '../../Components/VectorIcons';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const STORAGE_KEY = '@todo-list';

const CurrentTask = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [modalTask, setModalTask] = useState(false);
  const [currentIdInfo, setCurrentIdInfo] = useState();
  const [data, setData] = React.useState(null);
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        setTasks(data ? JSON.parse(data) : []);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData('Refreshed data!');

      console.log('Screen refreshed!');
    });

    return unsubscribe;
  }, [navigation]);
  const deleteTask = async id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const startEditing = task => {
    setEditingTask(task);
    setInputText(task.title);
    setDescriptionText(task.description);
    setDueDate(task.dueDate);
    setModalVisible(true);
  };

  const startEditing2 = task => {
    setEditingTask(task);
    setInputText(task.title);
    setDescriptionText(task.description);
    setDueDate(task.dueDate);
  };

  const saveTask = async () => {
    if (editingTask && inputText.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? {
              ...task,
              title: inputText,
              description: descriptionText,
              dueDate: dueDate,
            }
          : task,
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setInputText('');
      setDescriptionText('');
      setDueDate('');
      setModalVisible(false);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  };

  const checkTask = async task => {
    setCurrentIdInfo(task);
    setModalTask(true);
  };

  const checkStatus = async percentage => {
    setModalTask(false);
    if (editingTask && inputText.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? {
              ...task,
              completed: percentage,
            }
          : task,
      );
      setTasks(updatedTasks);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  };

  return (
    <>
      <Text style={{top: 20, textAlign: 'center', fontSize: 25}}>
        Active Tasks
      </Text>
      <Text style={{textAlign: 'center', fontSize: 20, top: 3}}>
        ____________________________________
      </Text>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <>
            {item.completed < '100' ? (
              <View style={{top: 20, height: heightRatio(18)}}>
                <LinearGradient
                  colors={['lavender', 'lightblue']}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: widthRatio(90),
                    alignSelf: 'center',
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      alignContent: 'center',
                      width: widthRatio(90),
                      alignSelf: 'center',
                      height: heightRatio(15),
                      borderRadius: 15,
                    }}>
                    <View style={{height: heightRatio(15)}}>
                      <Text style={{color: 'blue'}}>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: widthRatio(22),
                        justifyContent: 'space-between',
                      }}>
                      <Text>{item.dueDate}</Text>
                      {item.completed == '100' ? (
                        <Text>Compeled</Text>
                      ) : (
                        <Text>Active</Text>
                      )}
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          width: widthRatio(25),
                          right: 10,
                        }}>
                        <TouchableOpacity onPress={() => startEditing(item)}>
                          <AntDesign nameIcon={'edit'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteTask(item.id)}
                          style={{left: 4.5}}>
                          <AntDesign nameIcon={'delete'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            startEditing2(item);
                            checkTask(item.completed);
                          }}>
                          <AntDesign nameIcon={'info'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ) : // <View
            //   style={{
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     height: heightRatio(80),
            //   }}>
            //   <Text style={{color: '#FFADB0', fontSize: 18}}>
            //     No Active Tasks
            //   </Text>
            // </View>
            null}
          </>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        visible={modalTask}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              width: widthRatio(95),
              backgroundColor: 'white',
              padding: 25,
              borderRadius: 10,
              alignItems: 'center',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <View
              style={{
                top: 10,
                width: widthRatio(20),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => checkStatus('0')}>
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 1,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor:
                        currentIdInfo == '0' || currentIdInfo > 0
                          ? 'blue'
                          : 'red',
                    }}>
                    <Text>0%</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{bottom: -1}}>_____</Text>
                <TouchableOpacity onPress={() => checkStatus('25')}>
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 1,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor:
                        currentIdInfo == '0' || currentIdInfo >= 25
                          ? 'blue'
                          : 'red',
                    }}>
                    <Text>25%</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{bottom: -1}}>_____</Text>
                <TouchableOpacity onPress={() => checkStatus('50')}>
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 1,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: currentIdInfo >= 50 ? 'blue' : 'red',
                    }}>
                    <Text>50%</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{bottom: -1}}>_____</Text>
                <TouchableOpacity onPress={() => checkStatus('75')}>
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 1,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor:
                        currentIdInfo == '0' || currentIdInfo >= 75
                          ? 'blue'
                          : 'red',
                    }}>
                    <Text>75%</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{bottom: -1}}>_____</Text>
                <TouchableOpacity onPress={() => checkStatus('100')}>
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 1,
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      bottom: 2,
                      borderColor:
                        currentIdInfo == '0' || currentIdInfo >= 100
                          ? 'blue'
                          : 'red',
                    }}>
                    <Text>100%</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setModalTask(false)}>
                <AntDesign nameIcon={'close'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Edit task title..."
              value={inputText}
              onChangeText={text => setInputText(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Edit description..."
              value={descriptionText}
              onChangeText={text => setDescriptionText(text)}
            />
            <TouchableOpacity onPress={() => setCalendarVisible(true)}>
              <Text>Select Due Date</Text>
            </TouchableOpacity>
            {dueDate && <Text>Due Date: {dueDate}</Text>}
            <View
              style={{
                top: 10,
                flexDirection: 'row',
                width: widthRatio(20),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={saveTask}>
                <AntDesign nameIcon={'check'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign nameIcon={'close'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={calendarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={day => {
              setDueDate(day.dateString);
              setCalendarVisible(false);
            }}
          />
          <Button title="Close" onPress={() => setCalendarVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

export default CurrentTask;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
