import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Appbar, List, IconButton } from 'react-native-paper';
import backgroundImage from './assets/Login-amico.png';

const Tab = createBottomTabNavigator();

export default function App() {
  
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', name: 'John Doe', password: 'pass123' },
    { id: 2, username: 'user2', name: 'Jane Smith', password: 'pass456' },
    { id: 3, username: 'user3', name: 'Bob Johnson', password: 'pass789' },
  ]);

  const [cars, setCars] = useState([
    { id: 1, plateNumber: 'ABC123', brand: 'Toyota', state: 'disponible' },
    { id: 2, plateNumber: 'DEF456', brand: 'Honda', state: 'disponible' },
    { id: 3, plateNumber: 'GHI789', brand: 'Ford', state: 'disponible' },
  ]);

  const [rents, setRents] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [plateNumber, setPlateNumber] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carState, setCarState] = useState('Disponible');

  const [rentNumber, setRentNumber] = useState('');
  const [rentDate, setRentDate] = useState('');
  const [listCars, setListCars] = useState([]);
  const [listRents, setListRents] = useState(true);

  

  const handleLogout = () => {
    setLoggedInUser(null);
  }

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  


  const handleRegister = () => {
    const userExists = users.some(u => u.username === username);
    const validUsername = /^[a-zA-Z0-9]+$/.test(username);
    const validName = /^[a-zA-Z\s]+$/.test(name);
    const validPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);

    if (userExists) {
      alert('Este nombre de usuario ya existe');
    } else if (!validUsername) {
      alert('El nombre de usuario debe contener sólo letras y números');
    } else if (!validName) {
      alert('El nombre debe contener sólo letras y espacios');
    } else if (!validPassword) {
      alert('La contraseña debe contener letras y números');
    } else {
    const newUserId = users.length + 1;
    const newUser = { id: newUserId, username, name, password };
    setUsers([...users, newUser]);
    setLoggedInUser(newUser);
    }
  }
    
  const handleCarSave = () => {
    const carExists = cars.some(c => c.plateNumber === plateNumber);
    const validPlateNumber = /^[a-zA-Z0-9]+$/.test(plateNumber);
    const validBrand = /^[a-zA-Z\s]+$/.test(carBrand);
    if (carExists) {
      alert('Este número de placa ya está registrado');

    } else if (!validPlateNumber) {
      alert('El número de placa debe contener sólo letras y números');
      } else if (!validBrand) {
      alert('La marca debe contener sólo letras y espacios');
      } else {
      const newCarId = cars.length + 1;
      const newCar = { id: newCarId, plateNumber, brand: carBrand, state: carState };
      setCars([...cars, newCar]);
      setPlateNumber('');
      setCarBrand('');
      setCarState('Disponible');
      }
      }
      const [currentCar, setCurrentCar] = useState();
      const handleRentSave = () => {
      const rentExists = rents.some(r => r.rentNumber === rentNumber);
      const validRentNumber = /^[a-zA-Z0-9]+$/.test(rentNumber);
      if (rentExists) {
      alert('Este número de renta ya está registrado');
      } else if (!validRentNumber) {
      alert('El número de renta debe contener sólo letras y números');
      } else {
      const carroExistente = rents.find(rent => rent.car.plateNumber === plateNumber);
      if(carroExistente){
        alert('Carro con esta placa ya esta alquilado')
      }
      else{
        const newRentId = rents.length + 1;
        const newRent = { id: newRentId, rentNumber, rentDate, car: currentCar, user: loggedInUser };
        setRents([...rents, newRent]);
        setRentNumber('');
        setRentDate('');

      }
      }
      }
      
      const handleListCars = () => {
        // Si la sección de Cars no se está mostrando, se establece listCars en true
        // y se establecen en false las otras secciones (listRents).
        if (!listCars) {
          setListCars(true);
          setListRents(false);
        } else {
          // Si la sección de Cars ya se está mostrando, se oculta la sección
          setListCars(false);
        }
      };
      
      const handleListRents = () => {
        setListRents(true);
        setListCars(false);
      };
      
      return (
        
        <PaperProvider>
          <NavigationContainer style={styles.appbarl}>
            {loggedInUser ? (
              <Tab.Navigator style={styles.appbarl}>
              
                <Tab.Screen
                style={styles.appbarl}
                  name="Cars"
                  options={{
                    tabBarIcon: ({ color }) => (
                      <IconButton  icon="car" color={color} />
                      
                    ),
                  }}
                >
                  {() => (
                    <>
                      <Appbar style={styles.appbarl}>
                      <Appbar.Action style={styles.appbarl} icon="logout" onPress={handleLogout} />
                      <Appbar.Content title="Lista de vehículos" />
                      <Appbar.Action icon="plus" onPress={handleCarSave} />
                      <Appbar.Action icon="format-list-bulleted" onPress={handleListCars} />
                      </Appbar>
                      
                      <View style={styles.container}>
                      {listCars &&
    <View>
      <Text style={styles.title}>Lista de Autos</Text>
      <List.Section>
        <List.Subheader>Seleccione un auto:</List.Subheader>
        {cars.map(car => (
          <List.Item
            key={car.id}
            title={rents.find(rent => rent.car.plateNumber === car.plateNumber) ? car.plateNumber + ' No disponible' : car.plateNumber + ' Disponible'  }
            onPress={() => {
              setPlateNumber(car.plateNumber);
              setCarBrand(car.brand);
              setCarState(car.state);
              setCurrentCar(car);
            }}
          />
        ))}
      </List.Section>
    </View>
  }
                      <Text style={styles.text}>numero de placa</Text>
                        <TextInput
                          label="Número de placa"
                          value={plateNumber}
                          onChangeText={setPlateNumber}
                          style={styles.input}
                        />
                        <Text style={styles.text}>Marca del vehiculo</Text>
                        <TextInput
                          label="Marca del vehículo"
                          value={carBrand}
                          onChangeText={setCarBrand}
                          style={styles.input}
                        />
                      
                      </View>
                    </>
                  )}
                </Tab.Screen>
                <Tab.Screen style={styles.appbarl}
                  name="Rents"
                  options={{
                    tabBarIcon: ({ color }) => (
                      <IconButton  icon="calendar" color={color} />
                    ),
                  }}
                >
                  {() => (
                    <>
                    
                      <Appbar style={styles.appbarl}>
                        <Appbar.Content title="Lista de rentas" />
                        <Appbar.Action icon="plus" onPress={handleRentSave} />
                        <Appbar.Action icon="format-list-bulleted" onPress={handleListRents} />
                      </Appbar>
                      <View style={styles.container}>
                      {listRents &&
    <View>
      <Text style={styles.text}>Lista de Rentas</Text>
      <List.Section>
        <List.Subheader>Seleccione una renta:</List.Subheader>
        {rents.map(rent => (
          <List.Item
            key={rent.id}
            title={rent.rentNumber}
            onPress={() => {
              setRentNumber(rent.rentNumber);
              setRentDate(rent.rentDate);
              setPlateNumber(rent.car.plateNumber);
            }}
          />
        ))}
      </List.Section>
    </View>
  }
                      <Text style={styles.text}>numero de renta</Text>
                        <TextInput
                          label="Número de renta"
                          value={rentNumber}
                          onChangeText={setRentNumber}
                          style={styles.input}
                        />
                        <Text style={styles.text}>fecha</Text>
                        <TextInput
                          label="Fecha de renta"
                          value={rentDate}
                          onChangeText={setRentDate}
                          style={styles.input}
                        />
                        <Text style={styles.text}>numero de placa</Text>
                        <TextInput
                          label="Número de placa"
                          value={plateNumber}
                          onChangeText={setPlateNumber}
                          style={styles.input}
                        />
                      </View>
                    </>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            ) : (
              <View style={styles.container}>
              <Text style={styles.text}>Registrase primero</Text>
              <Text style={styles.text}>Ingrese nombre</Text>
                <TextInput
                  label="Nombre de usuario"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
                <Text style={styles.text}>Ingrese contraseña</Text>
                <TextInput
                  label="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry
                />
                
                <Text style={styles.text}>Ingrese nombre de usuario</Text>
                <TextInput
                  label="Nombre completo"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
            
      <IconButton
        icon="account-plus"
        color="#FFFFFF"
        size={24}
        onPress={handleRegister}
        style={styles.iconButton}
      />
      <IconButton
        icon="login"
        color="#FFFFFF"
        size={24}
        onPress={handleLogin}
        style={styles.iconButton}
      />
              </View>
            )}
          </NavigationContainer>
        </PaperProvider>
      );}

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0, #fef8fb 16.67%, #efe3eb 33.33%, #dac8d7 50%, #c4aec5 66.67%, #b09bb9 83.33%, #a18fb2 100%)'
        },
        appbarl:{
          background: 'transparent',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1c3435 0, #182a29 16.67%, #121b1a 33.33%, #000000 50%, #000000 66.67%, #000000 83.33%, #000000 100%)'
        },
        text:{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1C2833',
        },
        input: {
          height: 40,
          width: '80%',
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          borderColor: '#1C2833',
          fontSize: 16,
          backgroundColor:'#FDFEFE'
        },
        button: {
          backgroundColor: '#3498db',
          padding: 10,
          borderRadius: 5,
          width: '100%',
          alignItems: 'center',
          marginTop: 10,
        },
        buttonText: {
          color: '#fff',
          fontWeight: 'bold',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black'
        },
        listItem: {
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        listTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        iconButton: {
          backgroundImage: 'radial-gradient(circle at 50% 50%, #ff8c00 0, #ff7c00 12.5%, #ff6600 25%, #ff4700 37.5%, #ff0000 50%, #f20008 62.5%, #e80013 75%, #e1001d 87.5%, #de0028 100%)',
          marginHorizontal: 10,
        },
        listSubTitle: {
          fontSize: 16,
          color: '#666',
        },
  
      });