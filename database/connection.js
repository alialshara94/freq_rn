import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

async function Connect() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
        Asset.fromModule(require('./iq_allocated_bands.db')).uri,
        FileSystem.documentDirectory + 'SQLite/bandsDB.db'
    );
    return SQLite.openDatabase('bandsDB.db');
}

function Execute(query) {
    return new Promise((resolve, reject) => {
        Connect().then((db) =>
            db.transaction((tx) =>
                tx.executeSql(query, null
                    , (_, res) => resolve(
                        {
                            status: true,
                            details: res
                        }
                    )
                    , (_, error) => reject(
                        {
                            status: false,
                            details: error
                        }
                    )
                )))
    })
}

export default Execute;