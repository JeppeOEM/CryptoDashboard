import Section from "../models/Section";
import ApiClient from "./ApiClient";

export const GridItemClient = new ApiClient<Section>('sections');

