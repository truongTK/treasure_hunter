import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Challenges = new Mongo.Collection('challenges');

if (Meteor.isServer) {
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '318458325159045',
    secret: '5eac5245c3ce7c60929f16d523ff7d58'
  });
  Challenges.remove({});

  Challenges.insert({
    _id: '3FFtAhBLaM6vRbAfy',
    name: 'Challenge 1',
    gift: 'một tràng pháo tay',
    step: [
      {
        question: 'question 1',
        answer: '1',
        location: {lat: 10.729795, lng: 106.694756},
        textLocation: 'Đại học RMIT',
      },{
        question: 'question 2',
        answer: '2',
        location: {lat: 10.777021, lng: 106.695414},
        textLocation: 'Dinh độc lập',
      },{
        question: 'question 3',
        answer: '3',
        location: {lat: 10.772556, lng: 106.697991},
        textLocation: 'Chợ Bến Thành',
      }
    ],
  });

  Challenges.insert({
    _id: 'Q8x2zB3Pn7E32msrW',
    name: 'Challenge 2',
    gift: '1 chai dầu ăn',
    step: [
      {
        question: 'question 1',
        answer: 'answer 1',
        location: {lat: 0, lng: 0},
        textLocation: 'Địa điểm bắt đầu 2',
      },{
        question: 'question 2',
        answer: 'answer2',
        location: {lat: 0, lng: 0},
        textLocation: 'Địa điểm A',
      },{
        question: 'question 3',
        answer: 'answer3',
        location: {lat: 0, lng: 0},
        textLocation: 'Địa điểm T',
      }
    ],
  });

  Meteor.publish('userProfile', function() {
    return Meteor.users.find({
      _id: this.userId,
    });
  });

  Meteor.methods({
    getChallengeList: function() {
      return Challenges.find({}).map((challenge) => ({
        challengeId: challenge._id,
        location: challenge.step[0].location,
        text: challenge.step[0].textLocation,
        name: challenge.name,
        gift: challenge.gift,
      }));
    },
    chooseChallenge: function(challengeId) {
      Meteor.users.update({_id: this.userId}, {$set: {state: {
        challengeId: challengeId,
        step: 0,
        status: 'FINDING',
      }}});
    },
    getNextPosition: function(challengeId, step) {
      const target = Challenges.findOne({_id: challengeId}).step[step];
      return {
        textLocation: target.textLocation,
        location: target.location,
      };
    },
    surrender: function() {
      Meteor.users.update({_id: this.userId}, {$unset: {state: ''}});
    },
    takeChallenge: function(location) {
      //NOTE: check location again
      Meteor.users.update({_id: this.userId}, {$set: {'state.status': 'ANSWERING'}});
    },
    getChallengeQuestion: function(challengeId, step) {
      return Challenges.findOne(challengeId).step[step].question;
    },
    answerChallenge: function(challengeId, step, answer) {
      const challenge = Challenges.findOne(challengeId);
      const result = challenge.step[step].answer === answer;
      if (result) { // right answer
        if (step < challenge.step.length - 1) {// go next challenge
          Meteor.users.update({_id: this.userId}, {$set: {state: {
            challengeId: challengeId,
            step: step + 1,
            status: 'FINDING',
          }}});
        } else { // congratulation - finish.
          Meteor.users.update({_id: this.userId}, {$set: {state: {
            challengeId: challengeId,
            step: step,
            status: 'CONGRATULATION',
          }}});
        }
      }
      return result;
    },
    getChallengeGift: function(challengeId, step) {
      const gift = Challenges.findOne({_id: challengeId}).gift;
      return gift;
    },
    finishChallenge: function() {
      Meteor.users.update({_id: this.userId}, {$unset: {state: ''}});
    },
  });
}

Meteor.methods({
});
