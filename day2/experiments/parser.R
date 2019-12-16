library(tidyverse)

read_csv("results.csv") %>%        # read the data
  pull(content) %>%                # pull out the relevant column
  map_dfr(read_csv) %>%            # apply read_csv() to each element & map to a data frame
  write_csv("parsed_results.csv")  # write the data frame to a file


