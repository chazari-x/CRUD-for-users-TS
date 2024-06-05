import {AppDataSource} from "./data-source";
import {Users} from "./Users";

const userRepository = AppDataSource.getRepository(Users);

export const UserStorage = {
    async getAll() {
        return await userRepository.find();
    },
    async get(id: number)  {
        const user = await userRepository.findOneBy({id});

        if (!user) {
            throw new Error(`User not found`);
        }

        return user;
    },
    async create(user: Users) {
        if (!user.name || !user.email) {
            throw new Error('User name and email are required');
        }

        const c = userRepository.create(user);
        return await userRepository.save(c);
    },
    async update(user: Users) {
        if (!user.id) {
            throw new Error('User ID is required');
        }

        const u = await userRepository.findOneBy({id: user.id});
        if (!u) {
            throw new Error(`User not found`);
        }

        userRepository.merge(u, user);

        return await userRepository.save(user);
    },
    async delete(id: number) {
        if (!await userRepository.findOneBy({id})) {
            throw new Error(`User not found`);
        }

        return userRepository.delete(id);
    }
}