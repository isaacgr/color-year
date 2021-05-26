import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const PALETTE_QUERY = gql`
  query PaletteQuery($userId: ID!) {
    __schema {
      types {
        name
        fields {
          name
        }
      }
    }
    palette(userId: $userId) {
      joy
      sadness
      anger
      fear
      trust
      jealous
      surprise
      anticipation
      spiritual
      neutral
    }
  }
`;

const feelingSelected = (name) => {
  return { type: "feelingSelected", value: name };
};

const setPalette = (feeling, color) => {
  return { type: "setPalette", key: feeling, value: color };
};

export default function PaletteNames({ userId, feelingToColor, dispatch }) {
  const { loading, error, data } = useQuery(PALETTE_QUERY, {
    variables: { userId: userId },
    fetchPolicy: "no-cache"
  });
  useEffect(() => {
    if (!data) {
      return;
    }
    for (const [key, value] of Object.entries(data.palette)) {
      if (key === "__typename") {
        continue;
      }
      dispatch(setPalette(key, value));
    }
  }, [data]);

  if (loading) return <h2 className="sub-title">Loading...</h2>;
  if (error) {
    console.log(error);
    return (
      <h2 className="sub-title" id="error">{`Error: ${error.message}`}</h2>
    );
  }
  if (data.length === 0) {
    return (
      <h2 className="sub-title" id="error">
        No data
      </h2>
    );
  }
  return (
    <div className="palette--names">
      {data.__schema.types.map((field) => {
        if (field.name === "Palette") {
          return field.fields.map((fieldOptions) => {
            return (
              <button
                key={fieldOptions.name}
                style={{
                  backgroundColor:
                    feelingToColor[fieldOptions.name] || "#A9A9A9"
                }}
                className={`btn btn-lg palette--feeling-btn`}
                onClick={() => {
                  dispatch(feelingSelected(fieldOptions.name));
                }}
              >
                {fieldOptions.name.toUpperCase()}
              </button>
            );
          });
        }
      })}
    </div>
  );
}
