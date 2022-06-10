import * as SQLite from 'expo-sqlite'
import { SQLError, SQLTransaction } from 'expo-sqlite';
import Place from '../models/place';
import Place1 from '../models/place1';

const database = SQLite.openDatabase('places.db')

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(
            (tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`, [], () => {
                    resolve('');
                },
                    (_, error) => {
                        reject(error)
                        return false
                    }
                )
            }
        );
    })

    return promise

}

export function insertPlace(place: Place1) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO places (
                        title, imageUri, lat, lng
                    ) VALUES (?, ? ,?, ?)`, [
                    place.title, place.imageUri,
                    place.location.lat,
                    place.location.lng
                ], (_, result) => {
                    // console.log(result)
                    resolve(result)
                }, (_, error) => {
                    reject(error)
                    return false
                }
                )
            }
        )
    })

    return promise
}

export function fetchplaces(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql('SELECT * FROM places', [],
                (_, result) => {
                    const places: Place[] = [];
                    for (const dp of result.rows._array) {
                        places.push(new Place(
                            dp.title, dp.imageUri, {
                            lat: dp.lat, lng: dp.lng
                        },
                            dp.id
                        ))
                    }
                    // console.log(result.rows._array)
                    resolve(places)
                }, (_, error) => {
                    reject(error)
                    return false
                }
            )
        })
    })

    return promise
}

export function fetchplaceDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM places WHERE ID = ?`,
                [id],
                (_, result) => {
                    // console.log(result.rows._array)
                    resolve(result.rows._array[0])
                }, (_, error) => {
                    reject(error)
                    return false
                }
            )
        })
    })

    return promise
}