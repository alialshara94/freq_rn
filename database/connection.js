import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

const Connect = async () => {

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        // console.log("SQLite Not Found!")
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/bandsDB.db')).exists) {
        // console.log("bandsDB.db Not Found!")
        const [{ localUri }] = await Asset.loadAsync(require('../database/iq_allocated_bands.db'));
        await FileSystem.copyAsync({
            from: localUri,
            to: FileSystem.documentDirectory + 'SQLite/bandsDB.db'
        })
    }
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