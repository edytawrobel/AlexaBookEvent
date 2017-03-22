'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
var expect = chai.expect;
var DBhelper = require('../db_helper');
var dynasty = require('dynasty')({});
var EVENTS_TABLE_NAME = 'BookedEvents';
chai.config.includeStack = true;

describe('DBhelper', function(){

  var subject = new DBhelper();

  var record =       {
          "RoomDate": "joy room 2017-03-27",
          "RoomName": "joy room",
          "Owner": "dana",
          "Name": "yoga class",
          "Date": "2017-03-27",
          "StartTime": "17:00",
          "Duration": "PT60M"
        }

  it ('should return the record passed in', function(done) {
    var fakeBookedEventsTable = function() {
      return {
        findAll: function() {
          return new Promise(function(resolve, reject) {
            resolve(record);
          });
        }
      }
    }

    var subject = new DBhelper(fakeBookedEventsTable);

    subject.readRoomDateRecords("joy room 2017-03-27").then(function(candidate) {
      expect(candidate).to.equal(record);
      done();
    });
  });

  var items = {
      "Items": [
        {
          "RoomDate": "joy room 2017-03-27",
          "RoomName": "joy room",
          "Owner": "dana",
          "Name": "yoga class",
          "Date": "2017-03-27",
          "StartTime": "17:00",
          "Duration": "PT60M"
        },

        {
          "RoomDate": "living room 2017-03-28",
          "RoomName": "living room",
          "Owner": "evgeny",
          "Name": "software conference",
          "Date": "2017-03-28",
          "StartTime": "13:00",
          "Duration": "PT1H"
        },

        {
          "RoomDate": "big room 2017-03-29",
          "RoomName": "big room",
          "Owner": "stefan",
          "Name": "snore meditation",
          "Date": "2017-03-29",
          "StartTime": "14:00",
          "Duration": "PT30M"
        }
      ]
  };

});
