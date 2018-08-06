export default [
  {
    id: "1",
    direction: "mt",
    type: "sms",
    originator: "Messagbird",
    body: "This is a message",
    createdDatetime: "2018-08-01T20:21:20+00:00",
    recipients: {
      totalCount: 2,
      totalSentCount: 2,
      totalDeliveredCount: 2,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2018-08-01T20:21:25+00:00"
        },
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2018-08-01T20:21:25+00:00"
        }
      ]
    }
  },
  {
    id: "2",
    direction: "mt",
    type: "sms",
    originator: "MessageBird",
    body: "Message from my app",
    createdDatetime: "2018-08-01T19:16:00+00:00",
    recipients: {
      totalCount: 1,
      totalSentCount: 1,
      totalDeliveredCount: 1,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2018-08-01T19:16:04+00:00"
        }
      ]
    }
  },
  {
    id: "3",
    direction: "mt",
    type: "sms",
    originator: "+31642670097",
    body: "Testing the quick Send",
    createdDatetime: "201-80-01T18:39:49+00:00",
    recipients: {
      totalCount: 1,
      totalSentCount: 1,
      totalDeliveredCount: 1,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2018-08-01T18:39:53+00:00"
        }
      ]
    }
  },
  {
    id: "4",
    direction: "mo",
    type: "sms",
    originator: "75973",
    body: "+31642670097:\nThis is a test incoming messaege",
    reference: "11307383",
    validity: null,
    gateway: 0,
    typeDetails: {},
    datacoding: "plain",
    mclass: 1,
    scheduledDatetime: null,
    createdDatetime: "2018-08-01T22:35:42+00:00",
    recipients: {
      totalCount: 1,
      totalSentCount: 1,
      totalDeliveredCount: 1,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: null
        }
      ]
    }
  },
  {
    id: "5",
    direction: "mt",
    type: "sms",
    originator: "+31642670097",
    body: "Second test",
    createdDatetime: "2018-08-01T20:29:12+00:00",
    recipients: {
      totalCount: 1,
      totalSentCount: 1,
      totalDeliveredCount: 1,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2017-08-01T20:29:17+00:00"
        }
      ]
    }
  },
  {
    id: "6",
    direction: "mt",
    type: "sms",
    originator: "Roma",
    body: "Hello this is a test text message.",
    createdDatetime: "2018-08-01T10:40:00+00:00",
    recipients: {
      totalCount: 1,
      totalSentCount: 1,
      totalDeliveredCount: 1,
      totalDeliveryFailedCount: 0,
      items: [
        {
          recipient: +14708008076,
          status: "delivered",
          statusDatetime: "2017-08-01T10:40:04+00:00"
        }
      ]
    }
  }
]
