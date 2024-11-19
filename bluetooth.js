const BluetoothSerialPort = require('bluetooth-serial-port').BluetoothSerialPort;
const btSerial = new BluetoothSerialPort();
const { salvarDados } = require('./db');  // Importar a função para salvar os dados

// Configuração do endereço MAC e porta do dispositivo Bluetooth
const MAC_ADDRESS = 'XX:XX:XX:XX:XX:XX';  // Substitua pelo endereço do seu dispositivo
const PORT = 1;  // Porta usada para comunicação Bluetooth

// Função para iniciar a conexão Bluetooth e receber os dados
const iniciarBluetooth = () => {
   /*/ btSerial.findSerialPortChannel(MAC_ADDRESS, (channel) => {
        console.log(`Canal encontrado: ${channel}. Conectando ao dispositivo...`);
        btSerial.connect(MAC_ADDRESS, PORT, () => {
            console.log('Conectado ao dispositivo Bluetooth com sucesso.');

            btSerial.on('data', (buffer) => {
                const dataString = buffer.toString('utf-8');
                console.log(`Dados recebidos: ${dataString}`);

                // Supondo que os dados estejam no formato "temperatura:xx,umidade:yy"
                const [temperaturaPart, umidadePart] = dataString.split(',');
                const temperatura = parseFloat(temperaturaPart.split(':')[1]);
                const umidade = parseFloat(umidadePart.split(':')[1]);

                // Armazenar no MongoDB
                salvarDados(temperatura, umidade);
            });
        }, (err) => {
            console.error(`Erro ao conectar: ${err}`);
        });
    }, (err) => {
        console.error(`Erro ao encontrar canal serial: ${err}`);
    });/*/
};

module.exports = { iniciarBluetooth };
