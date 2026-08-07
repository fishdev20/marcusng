"use client";

import { Icon } from "@iconify/react";
import { Box, Button, Card, Flex, Grid, Spinner, Stack, Text, TextInput } from "@sanity/ui";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { set, unset, useFormValue, type StringInputProps } from "sanity";

const ICONIFY_SEARCH_URL = "https://api.iconify.design/search";
const PREFERRED_COLLECTIONS = "devicon,logos,simple-icons";

type IconifySearchResponse = {
  icons?: string[];
};

function isIconifyId(value?: string): value is string {
  return Boolean(value && /^[a-z0-9-]+:[a-z0-9-]+$/i.test(value));
}

export function IconifyPicker(props: StringInputProps) {
  const { onChange, path, readOnly, value } = props;
  const siblingName = useFormValue([...path.slice(0, -1), "name"]);
  const suggestedQuery = typeof siblingName === "string" ? siblingName : "";
  const [query, setQuery] = useState(suggestedQuery);
  const [queryEdited, setQueryEdited] = useState(false);
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!queryEdited && suggestedQuery) setQuery(suggestedQuery);
  }, [queryEdited, suggestedQuery]);

  useEffect(() => {
    const search = query.trim();
    if (search.length < 2) {
      setIcons([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          query: search,
          limit: "48",
          prefixes: PREFERRED_COLLECTIONS,
        });
        const response = await fetch(`${ICONIFY_SEARCH_URL}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Icon search is currently unavailable.");

        const data = (await response.json()) as IconifySearchResponse;
        setIcons(data.icons ?? []);
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") {
          setIcons([]);
          setError("Could not search Iconify. Check your connection and try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const selectedLabel = useMemo(() => {
    if (!value) return null;
    return isIconifyId(value) ? value : "Legacy icon URL";
  }, [value]);

  return (
    <Stack space={3}>
      {value ? (
        <Card border padding={3} radius={2} tone="transparent">
          <Flex align="center" gap={3}>
            <Card padding={2} radius={2} tone="default">
              {isIconifyId(value) ? (
                <Icon icon={value} width={28} height={28} aria-hidden />
              ) : (
                <img src={value} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
              )}
            </Card>
            <Box flex={1}>
              <Text size={1} weight="semibold">
                Selected icon
              </Text>
              <Box marginTop={2}>
                <Text muted size={1} textOverflow="ellipsis">
                  {selectedLabel}
                </Text>
              </Box>
            </Box>
            <Button
              aria-label="Clear selected icon"
              disabled={readOnly}
              icon={X}
              mode="bleed"
              onClick={() => onChange(unset())}
              tone="critical"
            />
          </Flex>
        </Card>
      ) : null}

      <TextInput
        disabled={readOnly}
        icon={Search}
        onChange={(event) => {
          setQueryEdited(true);
          setQuery(event.currentTarget.value);
        }}
        placeholder="Search React, RabbitMQ, OpenLayers..."
        value={query}
      />

      {loading ? (
        <Flex align="center" gap={2} padding={3}>
          <Spinner muted />
          <Text muted size={1}>
            Searching icons...
          </Text>
        </Flex>
      ) : null}

      {error ? (
        <Card padding={3} radius={2} tone="caution">
          <Text size={1}>{error}</Text>
        </Card>
      ) : null}

      {!loading && !error && query.trim().length >= 2 && !icons.length ? (
        <Card padding={3} radius={2} tone="transparent">
          <Text muted size={1}>
            No technology icons found. Try a shorter or more common name.
          </Text>
        </Card>
      ) : null}

      {icons.length ? (
        <Grid columns={[4, 6, 8]} gap={2}>
          {icons.map((icon) => {
            const selected = icon === value;

            return (
              <Card
                as="button"
                aria-label={`Select ${icon}`}
                aria-pressed={selected}
                border
                disabled={readOnly}
                key={icon}
                onClick={() => onChange(set(icon))}
                padding={3}
                radius={2}
                style={{ cursor: readOnly ? "default" : "pointer" }}
                tone={selected ? "primary" : "default"}
                type="button"
              >
                <Flex align="center" justify="center">
                  <Icon icon={icon} width={24} height={24} aria-hidden />
                </Flex>
              </Card>
            );
          })}
        </Grid>
      ) : null}

      <Text muted size={1}>
        Only the Iconify ID is saved. SVG files are loaded from Iconify when displayed.
      </Text>
    </Stack>
  );
}
