import Datastore from 'nedb';
import initialData from './data/hellofreshBox.json';

// Create a new NeDB datastore with persistence to 'recipes-database.db'
export const db = new Datastore({ filename: 'recipes-database.db', autoload: true });

// Check if data already exists in the database
db.findOne({ id: initialData.id }, (err, existingData) => {
  if (err) {
    console.error('Error checking for existing data:', err);
  } else if (!existingData) {
    // Data does not exist, insert it into the NeDB database
    db.insert(initialData, (err, newDoc) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted and persisted:', newDoc);
      }
    });
  } else {
    console.log('Data already exists in the database. No insertion needed.');
  }
});
