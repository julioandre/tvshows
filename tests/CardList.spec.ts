import { MovieItem } from "./../src/types/movieItem";
import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CardList from "../src/components/CardList.vue";
import ImageCard from "../src/components/ImageCard.vue";

describe("CardListContainer.vue", () => {
  let wrapper;
  const items: MovieItem[] = [
    {
      id: 1,
      name: "The Great Adventure",
      summary: "An epic tale of adventure and discovery across fantastical lands.",
      image: "http://example.com/image1.jpg",
      status: "Running",
      premiered: "2021-09-01",
      genres: ["Adventure", "Fantasy"],
      rating: 8.5,
      ended: null,
      network: {
        id: 101,
        name: "Adventure Network",
        country: {
          name: "USA",
          code: "US",
          timezone: "America/New_York",
        },
        officialSite: "http://example.com/adventure-network",
      },
    },
    {
      id: 2,
      name: "Mystery of the Ages",
      summary: "A gripping mystery that unfolds through time and space.",
      image: "http://example.com/image2.jpg",
      status: "Ended",
      premiered: "2019-06-15",
      genres: ["Mystery", "Drama"],
      rating: 9.0,
      ended: "2022-03-12",
      network: {
        id: 102,
        name: "Drama Channel",
        country: {
          name: "UK",
          code: "GB",
          timezone: "Europe/London",
        },
        officialSite: "http://example.com/drama-channel",
      },
    },
    {
      id: 3,
      name: "Sci-Fi Chronicles",
      summary: "An exploration of futuristic worlds and the impact of technology.",
      image: "http://example.com/image3.jpg",
      status: "Running",
      premiered: "2020-11-20",
      genres: ["Science Fiction", "Thriller"],
      rating: 8.8,
      ended: null,
      network: {
        id: 103,
        name: "Sci-Fi Network",
        country: {
          name: "Canada",
          code: "CA",
          timezone: "America/Toronto",
        },
        officialSite: "http://example.com/sci-fi-network",
      },
    },
  ];
  const genre = "Action";

  beforeEach(() => {
    wrapper = mount(CardList, {
      props: {
        items,
        genre,
      },
      global: {
        stubs: {
          ImageCard,
        },
      },
    });
  });

  it("renders the correct number of items", () => {
    const cardItems = wrapper.findAll(".card-item");
    expect(cardItems.length).toBe(items.length);
  });

  it("calls openPage when a card is clicked", async () => {
    const openPageMock = vi.spyOn(wrapper.vm, "openPage");
    const cardItem = wrapper.find(".card-item");
    await cardItem.trigger("click");

    expect(openPageMock).toHaveBeenCalledWith(items[0]); // Ensure the right item was clicked
  });

  it("scrolls left when left button is clicked", async () => {
    const scrollLeftMock = vi.spyOn(wrapper.vm, "scrollLeft");
    const leftButton = wrapper.find(".scroll-button.left");
    await leftButton.trigger("click");

    expect(scrollLeftMock).toHaveBeenCalled(); // Check if scrollLeft was called
  });

  it("scrolls right when right button is clicked", async () => {
    const scrollRightMock = vi.spyOn(wrapper.vm, "scrollRight");
    const rightButton = wrapper.find(".scroll-button.right");
    await rightButton.trigger("click");

    expect(scrollRightMock).toHaveBeenCalled(); // Check if scrollRight was called
  });

  it("emits the filter event with the correct genre when the view-all button is clicked", async () => {
    const filterEmitSpy = vi.spyOn(wrapper.vm.$emit, "filter");
    const viewAllButton = wrapper.find(".view-all-button");
    await viewAllButton.trigger("click");

    expect(filterEmitSpy).toHaveBeenCalledWith([genre]); // Verify the emitted filter event
  });
});
