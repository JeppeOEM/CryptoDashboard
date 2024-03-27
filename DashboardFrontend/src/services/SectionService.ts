import axios from "axios";
import Section from "../models/Section";
import DynamicGridItem from "../models/DynamicGridItem";

class SectionService {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  async getAll(): Promise<Section[]> {
    const response = await this.http.get<Section[]>("sections");
    return response.data;
  }

    async create(data: DynamicGridItem[] ) {
    const response = await this.http.post("sections", {
        GridConfig: JSON.stringify(data),
    });
    return response.data;
    }

  async delete(id: string): Promise<void> {
    await this.http.delete(`sections/${id}`);
  }
}

export default new SectionService();