/*
 * This file is part of the HealthyHome project management server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import config from "./config";
import * as mq from "./message-queue";
import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import * as updates from "./updates";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
        path: "/subscriptions",
    },
});

server
    .listen({
        port: config.serverPort,
    })
    .then(({ url }) => {
        mq.run(updates.process);
        console.log(`🚀 Server ready at ${url}`);
    });
