#include <catch2/catch.hpp>
#include <core/Message.h>

TEST_CASE("Entities are identical", "[entity-equality]")
{
    Core::Message::Entity ent1 { Core::Message::SENSOR, "entity1" };
    Core::Message::Entity ent2 { Core::Message::SENSOR, "entity1" };
    REQUIRE(ent1 == ent2);
}

TEST_CASE("Entities are not identical", "[entity-inequality]")
{
    Core::Message::Entity ent1 { Core::Message::SENSOR, "entity1" };
    Core::Message::Entity ent2 { Core::Message::DEVICE, "entity1" };
    REQUIRE(ent1 != ent2);
}