#include <catch2/catch.hpp>
#include <core/Message.h>
#include <core/exceptions.h>
#include <zmq-postman/Message.h>
#include <zmq-postman/Postman.h>

using namespace ZmqPostman;

struct BasicMessage : public Core::Message {
    SET_ENTITY  = SENSOR_ENTITY("sensorName");
    SET_SUBJECT = "subjectTitle";
    MAKE_MESSAGE(BasicMessage);

    int firstValue;
    float secondValue;
    std::string thirdValue;
    bool fourthValue;

    BasicMessage(int first, float second, std::string third, bool fourth) :
        firstValue(first), secondValue(second), thirdValue(third),
        fourthValue(fourth)
    {
    }

    void deserialize(const void* payload) override
    {
        auto* msg   = MessageBody::castPayload(payload);
        firstValue  = msg->getInteger("first");
        secondValue = msg->getFloat("second");
        thirdValue  = msg->get("third");
        fourthValue = msg->getBoolean("fourth");
        msg->assertSizeIs(4, "unexpected body fields");
    }

    void serialize(void* payload) const override
    {
        auto* msg = MessageBody::castPayload(payload);
        msg->putTagged("first", firstValue);
        msg->putTagged("second", secondValue);
        msg->put("third", thirdValue);
        msg->putTagged("fourth", fourthValue);
    }
};

Factories factories = { { BasicMessage::IDENTITY, BasicMessage::factory } };

TEST_CASE("Message serialization", "[zmq-message-serialization]")
{
    Message msg { BasicMessage { 3, 4.5f, "ok", true } };

    REQUIRE(msg.size() == 11);
    REQUIRE(msg.popstr() == "SENSOR");
    REQUIRE(msg.popstr() == "sensorName");
    REQUIRE(msg.popstr() == "subjectTitle");

    do {
        auto key   = msg.popstr();
        auto value = msg.popstr();

        REQUIRE(
            (key == "first" || key == "second" || key == "third"
             || key == "fourth"));

        if (key == "first") {
            REQUIRE(value == "integer:3");
        } else if (key == "second") {
            REQUIRE(value == "decimal:4.500000");
        } else if (key == "third") {
            REQUIRE(value == "ok");
        } else if (key == "fourth") {
            REQUIRE(value == "boolean:true");
        }
    } while (msg.size() > 0);
}

TEST_CASE("Message deserialization", "[zmq-message-deserialization]")
{
    std::array<std::string, 11> multipart
        = { "SENSOR", "sensorName", "subjectTitle", "first",  "3",   "second",
            "4.5",    "third",      "ok",           "fourth", "true" };
    Message zmqMsg;
    for (auto entry : multipart) {
        zmqMsg.addstr(entry);
    }
    auto msg      = zmqMsg.parse(factories);
    auto basicMsg = static_cast<BasicMessage*>(msg.get());

    REQUIRE(msg->getEntity() == BasicMessage::ENTITY);
    REQUIRE(msg->getSubject() == BasicMessage::SUBJECT);
    REQUIRE(basicMsg->firstValue == 3);
    REQUIRE(basicMsg->secondValue == 4.5);
    REQUIRE(basicMsg->thirdValue == "ok");
    REQUIRE(basicMsg->fourthValue == true);
}

TEST_CASE(
    "Faulty message deserialization: invalid type",
    "[zmq-message-deserialization]")
{
    std::array<std::string, 11> multipart
        = { "SENSOR",  "sensorName", "subjectTitle", "first",
            "invalid", "second",     "4.5",          "third",
            "ok",      "fourth",     "true" };
    Message zmqMsg;
    for (auto entry : multipart) {
        zmqMsg.addstr(entry);
    }

    REQUIRE_THROWS_MATCHES(
        zmqMsg.parse(factories),
        Core::Exception::InvalidArgument,
        Catch::Matchers::Message("invalid integer field 'first'"));
}

TEST_CASE(
    "Faulty message deserialization: missing field",
    "[zmq-message-deserialization]")
{
    std::array<std::string, 9> multipart
        = { "SENSOR", "sensorName", "subjectTitle", "first", "3",
            "second", "4.5",        "third",        "ok" };
    Message zmqMsg;
    for (auto entry : multipart) {
        zmqMsg.addstr(entry);
    }

    REQUIRE_THROWS_MATCHES(
        zmqMsg.parse(factories),
        Core::Exception::InvalidArgument,
        Catch::Matchers::Message("expected field 'fourth'"));
}

TEST_CASE(
    "Faulty message deserialization: unexpected field",
    "[zmq-message-deserialization]")
{
    std::array<std::string, 13> multipart
        = { "SENSOR", "sensorName", "subjectTitle", "first", "3",
            "second", "4.5",        "third",        "ok",    "fourth",
            "true",   "fifth",      "extra" };
    Message zmqMsg;
    for (auto entry : multipart) {
        zmqMsg.addstr(entry);
    }

    REQUIRE_THROWS_MATCHES(
        zmqMsg.parse(factories),
        Core::Exception::InvalidArgument,
        Catch::Matchers::Message("unexpected body fields"));
}